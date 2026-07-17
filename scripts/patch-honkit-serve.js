"use strict";

const fs = require("fs");
const path = require("path");

function patchServe() {
    const servePath = path.join(__dirname, "..", "node_modules", "honkit", "lib", "cli", "serve.js");
    const marker = "let rebuildQueue = Promise.resolve();";

    if (!fs.existsSync(servePath)) {
        console.warn("[patch-honkit-serve] honkit not installed, skip");
        return;
    }

    let source = fs.readFileSync(servePath, "utf8");

    if (source.includes(marker)) {
        console.log("[patch-honkit-serve] already patched");
        return;
    }

    const queueHelper = `let rebuildQueue = Promise.resolve();
function enqueueRebuild(task) {
    const result = rebuildQueue.then(() => task());
    rebuildQueue = result.catch((err) => {
        console.error(err);
    });
    return result;
}
`;

    source = source.replace(
        "let server, lrServer, lrPath;\nfunction triggerLiveReload()",
        `let server, lrServer, lrPath;\n${queueHelper}function triggerLiveReload()`
    );

    source = source.replace(
        `            callback: (error, filepath, eventType) => {
                if (error) {
                    console.error(error);
                    return;
                }
                // If the file does not exist in file system, show a warning and skip`,
        `            callback: (error, filepath, eventType) => {
                if (error) {
                    console.error(error);
                    return;
                }
                return enqueueRebuild(() => {
                // If the file does not exist in file system, show a warning and skip`
    );

    source = source.replace(
        `                }).then((output) => {
                    lastOutput = output;
                    if (hasLiveReloading)
                        triggerLiveReload();
                });
            }
        });`,
        `                }).then((output) => {
                    lastOutput = output;
                    if (hasLiveReloading)
                        triggerLiveReload();
                });
                });
            }
        });`
    );

    if (!source.includes(marker)) {
        console.error("[patch-honkit-serve] patch failed: honkit serve.js structure changed");
        process.exit(1);
    }

    fs.writeFileSync(servePath, source);
    console.log("[patch-honkit-serve] patched honkit serve rebuild queue");
}

function patchHighlight() {
    const highlightPath = path.join(
        __dirname,
        "..",
        "node_modules",
        "@honkit",
        "honkit-plugin-highlight",
        "index.js"
    );
    const marker = "if (!hljs.getLanguage(lang))";

    if (!fs.existsSync(highlightPath)) {
        console.warn("[patch-honkit-highlight] plugin not installed, skip");
        return;
    }

    let source = fs.readFileSync(highlightPath, "utf8");

    if (source.includes(marker)) {
        console.log("[patch-honkit-highlight] already patched");
        return;
    }

    const MAP = {
        py: "python",
        js: "javascript",
        json: "javascript",
        rb: "ruby",
        csharp: "cs",
        blade: "xml",
        mermaid: "plaintext",
    };

    const next = `const hljs = require("highlight.js");

const MAP = ${JSON.stringify(MAP, null, 4)};

function normalize(lang) {
    if (!lang) {
        return null;
    }

    const lower = lang.toLowerCase();
    return MAP[lower] || lower;
}

/**
 * @param {string} lang
 * @param {string} code
 * @returns {string|{html: boolean, body}}
 */
function highlight(lang, code) {
    if (!lang)
        return {
            body: code,
            html: false
        };

    // Normalize lang
    lang = normalize(lang);

    if (!hljs.getLanguage(lang)) {
        return {
            body: code,
            html: false
        };
    }

    try {
        return hljs.highlight(code, {
            language: lang
        }).value;
    } catch (e) {
        console.error(e);
    }

    return {
        body: code,
        html: false
    };
}

module.exports = {
    book: {
        assets: "./css",
        css: ["website.css"]
    },
    ebook: {
        assets: "./css",
        css: ["ebook.css"]
    },
    blocks: {
        code: function (block) {
            return highlight(block.kwargs.language, block.body);
        }
    }
};
`;

    fs.writeFileSync(highlightPath, next);
    console.log("[patch-honkit-highlight] patched unknown-language fallback");
}

patchServe();
patchHighlight();
