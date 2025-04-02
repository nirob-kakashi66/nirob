const { spawn } = require("child_process"); const log = require("./logger/log.js");

function startProject() { log.info("Starting Project...");

const process = spawn("pnpm", ["start"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
});

process.on("exit", (code) => {
    if (code !== 0) {
        log.info("Restarting Project immediately...");
        setTimeout(startProject, 1000); // 1s delay for stability
    }
});

}

startProject();

