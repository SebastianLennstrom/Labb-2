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
        const task = await fs.readFile('./task.json');
        
        res.send(JSON.parse(tasks))
        console.log(req.body)
    }catch(error){
        res.status(500).send({error})}
})
app.post("/task", async(req, res) => {
    try{
        const task = req.body;

        const listBuffer = await fs.readFile("./tasks.json");
        const currentTasks = JSON.parse(listBuffer);
        let maxTaskId = 1;
        if(currentTasks && currentTasks.length > 0){
            maxtaskId = currentTasks.reduce(
                (maxid, currentElement) => (currentElement.id > maxid ? currentElement.id : maxid),
                maxTaskId
            );   
        }

        const newTask = { id: maxTaskId + 1, ...task }
        const newList = currentTasks ? [...currentTasks + newTask] : [newTask];

        await fs.writeFile("./tasks.json", JSON.stringify(newList));
        res.send(newTask); 
        }catch(error){
        res.status(500).send({error: error.stack})};

})
app.listen(PORT, () => console.log('server running on http://localhost:5000'))