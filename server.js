const express = require(`express`)

const app = express();

const port = process.env.PORT || 5000;

//Parser le corps des requetes en JSON
app.use(express.json());

//Stocker les tâches en memoire
let tasks = [];
let currentId = 1;

//Route pour créer de nouvelles tâches
app.post(`/tasks`,(req,res) => {
    const task = {
        id: currentId++,
        tittle:
        req.body.tittle,
        completed: false,
    };
    tasks.push(task);
    res.status(201).json(task);
});

//Routes pour lire la liste des tâches
app.get(`/tasks`,(req,res) => {
    res.json(tasks);
});

//Routes pour afficher une tâche spécifique
app.get(`/tasks/:id`,(req,res) => {
    const task = tasks.find(t=> t.id===parseInt(req.params.id));
    if (!task) return 
    res.status(404).send(`Tâche non trouvée`);
    res.json(task);
});

//Route pour modifier une tâche
app.put(`/tasks/:id`,(req,res) => {
    const task = tasks.find(t=> t.id===parseInt(req.params.id));
    if (!task) return 
    res.status(404).send(`Tâche non trouvée`);
    res.json(task);

    task.tittle = req.body.tittle !== undefined ? req.body.tittle : task.tittle ;
        task.completed = req.body.completed !==undefined ? req.body.completed : task.completed;
        res.json(task);
});

//Route pour supprimer une tâche
app.delete(`/tasks/:id`,(req,res) => {
    const taskIndex = tasks.findIndex(t=> t.id===parseInt(req.params.id));
    if (!taskIndex===-1) 
        return 
    res.status(404).send(`Tâche non trouvée`);
    tasks.splice(taskIndex,1);
    res.status(404).send
});

app.get(`/`,(request,response)=>{
    response.send(`Salut les amis, Bienvenu sur le serveur de Anicet`);
})


//Pour démarrer le serveur
app.listen(port, ()=>{
    console.log(`Serveur en écoute sur le Port:` +port )
})

