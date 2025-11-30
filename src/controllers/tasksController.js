const tasksService = require('../services/tasksService');
const { isNonEmptyString, isValidId } = require('../utils/validation');

function listTasks(req, res) {
  const result = tasksService.listTasks();
  res.json(result);
}

function listDoneTasks(req, res) {
  const result = tasksService.listDoneTasks();
  res.json(result);
}

function listPendingTasks(req, res) {
  const result = tasksService.listPendingTasks();
  res.json(result);
}

function createTask(req, res) {
  const { title, description } = req.body;

  if (!isNonEmptyString(title)) {
    return res.status(400).json({ message: 'title é obrigatório' });
  }

  try {
    const task = tasksService.createTask(title, description || '');
    return res.status(201).json(task);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

function getTask(req, res) {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'id inválido' });
  }

  const task = tasksService.getTaskById(Number(id));

  if (!task) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  res.json(task);
}

function updateTask(req, res) {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'id inválido' });
  }

  const task = tasksService.updateTask(Number(id), req.body);

  if (!task) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  res.json(task);
}

function deleteTask(req, res) {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: 'id inválido' });
  }

  const ok = tasksService.deleteTask(Number(id));

  if (!ok) {
    return res.status(404).json({ message: 'Task não encontrada' });
  }

  res.status(204).send();
}

function deleteAllTasks(req, res) {
  const hadTasks = tasksService.deleteAllTasks();

  if (!hadTasks) {
    return res.status(204).send();
  }

  return res.status(200).json({ message: 'Todas as tasks foram removidas' });
}

function searchTasks(req, res) {
  const { title } = req.query;
  const result = tasksService.searchTasksByTitle(title || '');
  res.json(result);
}

function getSummary(req, res) {
  const summary = tasksService.getTasksSummary();
  res.json(summary);
}

module.exports = {
  listTasks,
  listDoneTasks,
  listPendingTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  searchTasks,
  getSummary,
};
