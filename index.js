// Goat Bot Render Deployment - Optimized by Eren
const express = require("express"); 
const { spawn } = require("child_process"); 
const log = require("./logger/log.js");

// === Express server to prevent Render from sleeping ===
const app = express(); 
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => { 
    res.send("✅ Goat Bot is alive and running on Render!"); 
});

app.listen(PORT, () => { 
    console.log(`✅ Server running at http://localhost:${PORT}`); 
});

// === Start the Goat Bot process ===
function startProject() { 
    log.info("🚀 Starting Goat Bot...");

    const child = spawn("node", ["Goat.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("exit", (code) => {
        log.info(`Goat Bot exited with code ${code}`);
        if (code !== 0) {
            log.info("🔄 Restarting Goat Bot...");
            setTimeout(startProject, 2000); // 2s delay to avoid rapid crash loop
        }
    });
}

startProject();
