"use strict";

const fs = require("fs");
const path = require("path");

function walkHtml(dir, files = []) {
    if (!fs.existsSync(dir)) {
        return files;
    }

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkHtml(full, files);
        } else if (entry.name.endsWith(".html")) {
            files.push(full);
        }
    }

    return files;
}

function copyIfExists(src, dest) {
    if (!fs.existsSync(src)) {
        return false;
    }
    fs.copyFileSync(src, dest);
    return true;
}

function fixFaviconLinks(html) {
    let next = html
        .replace(
            /href="(?:\.\.\/)*gitbook\/images\/favicon\.ico"/g,
            'href="/favicon.ico"'
        )
        .replace(
            /href="(?:\.\.\/)*gitbook\/images\/apple-touch-icon-precomposed-152\.png"/g,
            'href="/apple-touch-icon.png"'
        )
        .replace(
            /href="\/gitbook\/images\/favicon\.ico"/g,
            'href="/favicon.ico"'
        )
        .replace(
            /href="\/gitbook\/images\/apple-touch-icon-precomposed-152\.png"/g,
            'href="/apple-touch-icon.png"'
        );

    // Ensure modern + legacy icon tags with absolute root paths
    if (!next.includes('rel="icon" href="/favicon.ico"')) {
        if (next.includes('rel="shortcut icon" href="/favicon.ico"')) {
            next = next.replace(
                '<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">',
                '<link rel="icon" href="/favicon.ico" type="image/x-icon">\n    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">'
            );
        } else if (next.includes("</head>")) {
            next = next.replace(
                "</head>",
                '    <link rel="icon" href="/favicon.ico" type="image/x-icon">\n    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n</head>'
            );
        }
    }

    return next;
}

module.exports = {
    hooks: {
        finish() {
            const root = this.output.root();
            const themeFavicon = path.join(root, "gitbook", "images", "favicon.ico");
            const themeApple = path.join(
                root,
                "gitbook",
                "images",
                "apple-touch-icon-precomposed-152.png"
            );
            const pluginFavicon = path.join(__dirname, "assets", "favicon.ico");
            const pluginApple = path.join(__dirname, "assets", "apple-touch-icon.png");

            const faviconSrc = fs.existsSync(themeFavicon) ? themeFavicon : pluginFavicon;
            const appleSrc = fs.existsSync(themeApple) ? themeApple : pluginApple;

            copyIfExists(faviconSrc, path.join(root, "favicon.ico"));
            copyIfExists(appleSrc, path.join(root, "apple-touch-icon.png"));

            for (const file of walkHtml(root)) {
                const html = fs.readFileSync(file, "utf8");
                const next = fixFaviconLinks(html);
                if (next !== html) {
                    fs.writeFileSync(file, next);
                }
            }
        },
    },
};
