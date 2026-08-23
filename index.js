const express = require('express');
const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// In-memory task store
const tasks = [
    { id: 1, title: 'Buy a book', done: true },
    { id: 2, title: 'Go on a morning walk', done: true },
    { id: 3, title: 'Go to market', done: false },
]

// API metadata
app.get('/', (req, res) => {
    res.json({
        name: 'Task API',
        version: '1.0',
        endpoints: ['/tasks'],
    });
});

// Liveness check for load balancers and monitoring
app.get('/health', (req, res) => {
    res.json({status: 'OK' });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (title === undefined || title === null || String(title).trim() === '') {
    return res.status(400).json({ error: 'title is required and cannot be empty' });
  }

  const id = tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;
  const task = { id, title: String(title).trim(), done: false };

  tasks.push(task);
  res.status(201).json(task);
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
