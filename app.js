const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Routes to serve HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/display", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "display.html"));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
