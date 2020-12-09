const savedNotes = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
  app.post("/api/notes", (req, res) => {
    let note = req.body;
    note.id = uuid.v4();
    savedNotes.push(note);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const chosen = req.params.id;
    const currentNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = JSON.stringify(
      currentNotes.filter((note) => note.id !== chosen)
    );
    fs.writeFileSync("./db/db.json", newNotes);
    res.json(currentNotes);
  });
};
