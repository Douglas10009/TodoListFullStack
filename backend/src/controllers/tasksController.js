// -- 
// Essse arquivo serve para dizer quais são os dados que vão para o tasksModels
// -- 

const tasksModel = require('../models/tasksModels');

// Ele vai ficar responsável por receber os itens do banco
//  _ antes da variável significa que a variável não está sendo usada
const getAll = async (_request, response) => {

    // Tasks pega os dados do bd no models e retorna para o controlador
    const tasks = await tasksModel.getAll();

    // Retorna para a rota as tasks 
    return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
    const createdTask = await tasksModel.createTask(request.body);
    return response.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
    // Retira dos parametros da requisição o ID dela (valor que é o mesmo do taskModels)
    const {id} = req.params;

    await tasksModel.deleteTask(id);

    return res.status(204).json();
};

const updateTask = async (req, res) => {
    const {id} = req.params;

    await tasksModel.updateTask(id, req.body);

    return res.status(204).json();
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};