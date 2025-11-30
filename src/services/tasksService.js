let tasks = [];
let currentId = 1;

function validateTaskTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

function normalizeSearchTerm(term) {
  return typeof term === 'string' ? term.trim().toLowerCase() : '';
}

function listTasks() {
  return tasks;
}

function listDoneTasks() {
  return tasks.filter((t) => t.done);
}

function listPendingTasks() {
  return tasks.filter((t) => !t.done);
}

function createTask(title, description) {
  if (!validateTaskTitle(title)) {
    throw new Error('Título inválido');
  }

  const task = {
    id: currentId++,
    title: title.trim(),
    description: (description || '').trim(),
    done: false,
  };
  tasks.push(task);
  return task;
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id);
}

function updateTask(id, data) {
  const task = getTaskById(id);
  if (!task) return null;

  if (typeof data.title === 'string' && data.title.trim().length > 0) {
    task.title = data.title.trim();
  }

  if (typeof data.description === 'string') {
    task.description = data.description.trim();
  }

  if (typeof data.done === 'boolean') {
    task.done = data.done;
  }

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

function deleteAllTasks() {
  const hadTasks = tasks.length > 0;
  tasks = [];
  currentId = 1;
  return hadTasks;
}

function searchTasksByTitle(term) {
  const normalized = normalizeSearchTerm(term);
  if (!normalized) return [];
  return tasks.filter((t) =>
    t.title.toLowerCase().includes(normalized)
  );
}

function getTasksSummary() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;

  return {
    total,
    done,
    pending,
  };
}

function _resetTasks() {
  tasks = [];
  currentId = 1;
}

module.exports = {
  listTasks,
  listDoneTasks,
  listPendingTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  deleteAllTasks,
  searchTasksByTitle,
  getTasksSummary,
  _resetTasks,
  validateTaskTitle,
  normalizeSearchTerm,
};
