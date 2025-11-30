const tasksService = require('../services/tasksService');

function listTasks(req, res) {
  const result = tasksService.listTasks();
  res.json(result);
}

function createTask(req, res) {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title é obrigatório' });
  }

  const task = tasksService.createTask(title, description || '');
  res.status(201).json(task);
}

function getTask(req, res) {
  const id = Number(req.params.id);
  const task = tasksService.getTaskById(id);

  if (!task) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  res.json(task);
}

function updateTask(req, res) {
  const id = Number(req.params.id);
  const task = tasksService.updateTask(id, req.body);

  if (!task) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  res.json(task);
}

function deleteTask(req, res) {
  const id = Number(req.params.id);
  const ok = tasksService.deleteTask(id);

  if (!ok) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  res.status(204).send();
}

module.exports = {
  listTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
