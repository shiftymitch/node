const fs = require('fs'); 
const path = require('path');
const notesData = require("../data/db.json");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });
    
    app.post("/api/notes", function(req, res) {
        notesData.push(req.body);
        res.json(true);
    });

    app.delete("/api/notes/:id", function(req, res) {
        var chosen = req.params.id;
        console.log(chosen)
        for (var i = 0; i < notesData.length; i++) {
            if(chosen === notesData[i].id) {
                notesData.splice(i, 1);
                fs.writeFileSync(path.join(__dirname, "../data/db.json"), JSON.stringify(notesData));
                res.json(true);
            }
        }
        console.log(notesData[i]);
        return res.json(false);
    });
};