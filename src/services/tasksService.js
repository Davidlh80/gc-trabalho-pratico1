let tasks = [];
let currentId = 1;

function listTasks() {
  return tasks;
}

function createTask(title, description) {
  const task = {
    id: currentId++,
    title,
    description,
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

  task.title = data.title ?? task.title;
  task.description = data.description ?? task.description;
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

function _resetTasks() {
  tasks = [];
  currentId = 1;
}

module.exports = {
  listTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  _resetTasks,
};
