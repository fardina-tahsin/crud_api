const express = require('express');
const app = express();
const PORT = 3000;

const tasks = [
    { id: 1, title: 'Buy a book', done: true },
    { id: 2, title: 'Go on a morning walk', done: true },
    { id: 3, title: 'Go to market', done: false },
]

app.get('/', (req, res) => {
    res.json({
        name: 'Task API',
        version: '1.0',
        endpoints: ['/tasks'],
    });
});

app.get('/health', (req, res) => {
    res.json({status: 'OK' });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} is not found` });
  }

  res.json(task);
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
