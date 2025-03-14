const express = require('express');
const app = express();
const port = 5000; // Changement du port à 5000

// message du naviguateur
app.get(`/`,(request,response)=>{
    response.send(`Salut les amis, Bienvenu sur le serveur de Anicet`);
})

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Stocker les tâches en mémoire
let tasks = [];
let currentId = 1;

// Route pour créer une nouvelle tâche
app.post('/tasks', (req, res) => {
    const task = {
        id: currentId++,
        title: req.body.title,
        completed: false,
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Route pour lire la liste des tâches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route pour afficher une tâche spécifique
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Tâche non trouvée');
    res.json(task);
});

// Route pour modifier une tâche
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Tâche non trouvée');

    task.title = req.body.title !== undefined ? req.body.title : task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

    res.json(task);
});

// Route pour supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Tâche non trouvée');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`API en cours d'exécution à http://localhost:${port}`);
});