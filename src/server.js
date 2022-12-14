const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const NOTES_COLLECTION_NAME = "notes";

const HttpCode = {
  OK: 200
}

dotenv.config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

(async () => {
  const app = express();
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  await client.connect();

  const db = client.db(dbName);

  app.use(express.json());
  app.use(express.static("src/static"));

  const server = app.listen(port);

  server.on("listening", () => console.log(`Server in running on port ${port}`));
  server.on("error", (err) => console.error(err));

  app.get("/", (_req, res) => {
    res.status(HttpCode.OK).sendFile(path.join(__dirname, "static/index.html"));
  });

  app.post("/note", (req, res) => {
    const { text } = req.body;

    const newNote = db.collection(NOTES_COLLECTION_NAME).insertOne({ text, date: new Date() });

    return res.status(HttpCode.OK).send(newNote._id);
  });

  app.get("/notes", async (_req, res) => {
    const cursor = db.collection(NOTES_COLLECTION_NAME).find({});
    const notes = await cursor.toArray()

    return res.status(HttpCode.OK).send(notes);
  });
})();
