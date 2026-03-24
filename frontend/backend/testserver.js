const express = require("express");
const app = express();

console.log("🔥 Test Server Started");

app.get("/", (req, res) => {
    res.send("Backend Running ✅");
});

app.listen(5001, () => {
    console.log("🚀 Server running on http://localhost:5001");
});