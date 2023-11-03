// --
// Esse arquivo serve para controlar as rotas
// -- 

const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldBody , tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',tasksMiddleware.validateFieldBody, tasksMiddleware.validateFieldStatus , tasksController.updateTask);



module.exports = router;

