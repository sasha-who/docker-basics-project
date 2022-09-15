const path = require("path");
const express = require("express");

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.static("src/static"));

const server = app.listen(port);

server.on("listening", () => console.log(`Server in running on port ${port}`));
server.on("error", (err) => console.error(err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});
