const fs = require('fs')
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000
var bodyParser = require('body-parser');

var htmlPath = path.join(__dirname, 'public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(htmlPath));
app.get("/notes",function(req,res) {
    res.sendfile(path.join(htmlPath, 'notes.html'))
})
app.get("/api/notes", async function(req,res) {
    res.json(await getDB());
})
app.post("/api/notes", async function(req,res) {
    const database = await getDB();
    req.body.id = database[database.length - 1].id + 1;
    database.push(req.body);
    await writeDB(database)
    res.send(req.body)
})
app.delete("/api/notes/:id", async function(req,res) {
    const database = await getDB();
    database.forEach(element => {
        if (element.id == parseInt(req.params.id)) {
            
            var index = database.indexOf(element);
            if (index > -1) {
                database.splice(index, 1);
            }
        }
    });
    writeDB(database)
    res.send(req.body);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function getDB() {
    return JSON.parse(fs.readFileSync('./db/db.json'));
}
async function writeDB(data) {
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
}