const express = require("express");
const app = express();
const fs = require("fs/promises")

const PORT = 5000;

app.use(express.json()).
use(express.urlencoded({extended: false})).
use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Method", "*");

    next();
});

app.get('/task', async (req, res) => {
    try {
        const tasks = await fs.readFile("./tasks.json");
    res.send(JSON.parse(tasks))
    } catch(error){
        res.status(500).send({error})
    }
    
});

app.post('/tasks', async (req, res) => {
    try{
        console.log(req.body)
    }catch(error){
        res.status(500).send({error})}
})
app.listen(PORT, () => console.log('server running on http://localhost:5000'))