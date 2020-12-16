const router = require("express").Router();
const { nanoid } = require("nanoid")
const fs = require('fs')
const path = require("path");
const db = path.join(__dirname, "../db/db.json");

router.get("/notes", (req, res) => {
    fs.readFile(db, "utf8", (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data));
    });
});

router.delete("/notes/:id", (req, res) => {
    fs.readFile(db, "utf8", (err, data) => {
        if (err) throw err
        const note = req.params.id;
        const deleteNote = JSON.parse(data);
        const newVar = deleteNote.filter((element) => note !== element.id);
        fs.writeFile(db, JSON.stringify(newVar), (err) => {
            if (err) return res.JSON({ err: "problem adding" });
            res.json({ msg: "successfully added" });
        });
    });
});

router.post("/notes", (req, res) => {
        function appendNote(req) {
        fs.readFile(db, "utf8", (err, data) => {
            if (err) throw err
            let note = JSON.parse(data)
            req.id = nanoid()
            note.push(req)
            fs.writeFile(db, JSON.stringify(note), (err) => {
            if (err) return res.JSON({ err: "problem adding" });
            res.json({ msg: "successfully added" });
            });
        })
    }
    appendNote(req.body)
})   

module.exports = router