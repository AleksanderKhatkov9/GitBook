"use strict";

const net = require("net");

const PORT = 4000;

function isPortInUse(port) {
    return new Promise((resolve) => {
        const socket = net.connect({ port, host: "127.0.0.1" }, () => {
            socket.end();
            resolve(true);
        });
        socket.on("error", () => resolve(false));
    });
}

isPortInUse(PORT).then((busy) => {
    if (!busy) {
        return;
    }

    console.error("");
    console.error("npm run serve уже запущен (порт " + PORT + ").");
    console.error("Остановите его Ctrl+C в том терминале, затем снова npm run build.");
    console.error("Пока serve держит папку _book/, honkit build зависает и не пересобирает сайт.");
    console.error("");
    process.exit(1);
});
