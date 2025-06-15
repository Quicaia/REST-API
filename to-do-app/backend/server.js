/** */
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


let tarefas = [];

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
  });
  
  app.post('/tarefas', (req, res) => {
    const { texto } = req.body;
    const novaTarefa = { id: Date.now(), texto };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
  });
  
  app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    tarefas = tarefas.filter(t => t.id !== id);
    res.status(204).send();
  });
  
  app.listen(5500, () => {
    console.log('API rodando em http://localhost:5500');
  });
