const express = require('express');
const controller = require('../controllers/tasksController');

const router = express.Router();

// Listagem
router.get('/', controller.listTasks);
router.get('/done', controller.listDoneTasks);
router.get('/pending', controller.listPendingTasks);
router.get('/search', controller.searchTasks);
router.get('/summary', controller.getSummary);

// Criação
router.post('/', controller.createTask);

// Exclusão em massa
router.delete('/', controller.deleteAllTasks);

// Operações por id (coloca depois das rotas específicas)
router.get('/:id', controller.getTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
