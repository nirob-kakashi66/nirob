const { spawn } = require("child_process"); const log = require("./logger/log.js");

function startProject() { log.info("Starting Project...");

const process = spawn("node", ["EREN.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
});

process.on("exit", (code) => {
    if (code === 0) {
        log.info("Project exited successfully.");
    } else {
        log.info("Restarting Project due to error...");
        setTimeout(startProject, 3000); // Adds a 3s delay before restart
    }
});

}

startProject();

