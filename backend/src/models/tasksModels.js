// --
// Esse arquivo pega os dados da taskController, verifica os dados no banco e retorna o resultado
// -- 

const connection = require('./connetion');

// Acessar o banco de dados e retornar
const getAll =  async () => {
    // array destruction
    // Retorna somente a primeira posição do array
    const [tasks] = await connection.execute('SELECT * FROM tasks');// ele espera uma query em sql
    return tasks;
};

const createTask = async (task) => {
    const {title} = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status,created_at) VALUES (?,?,?)';
    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
    
    return {insertId: createdTask.insertId};
};

const deleteTask = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    // What about a updated_at?
    const { title, status } = task;

    const updatedTask = (await connection.execute('UPDATE tasks SET title=?, status = ? WHERE id=?', [title, status, id]));

    return updatedTask;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};