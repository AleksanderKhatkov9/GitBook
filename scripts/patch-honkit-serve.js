"use strict";

const fs = require("fs");
const path = require("path");

const servePath = path.join(__dirname, "..", "node_modules", "honkit", "lib", "cli", "serve.js");
const marker = "let rebuildQueue = Promise.resolve();";

if (!fs.existsSync(servePath)) {
    console.warn("[patch-honkit-serve] honkit not installed, skip");
    process.exit(0);
}

let source = fs.readFileSync(servePath, "utf8");

if (source.includes(marker)) {
    console.log("[patch-honkit-serve] already patched");
    process.exit(0);
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
