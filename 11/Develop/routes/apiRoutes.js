let noteData = require("../db/db");
const fs = require("fs");


module.exports = function(app) {

    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {
        noteData.push(req.body);
        res.json(true);
    });
    
    app.delete("/api/notes/:id", function (req, res) {
        let chosen = req.params.id;
        console.log(chosen);
        for (let note of noteData) {
            if (chosen === note.id) {
                let index = noteData.indexOf(note);
                noteData.splice(index, 1);
                fs.writeFileSync("../db/db.json", noteData);
            }
        }
        res.send('Got a DELETE request');
    });
};