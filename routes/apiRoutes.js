const router = require("express").Router();

router.get("/notes", (req, res) => {
    false.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err

        
    })
})

module.exports = router