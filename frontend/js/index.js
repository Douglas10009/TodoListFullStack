const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task')

// Pegar o backend
const fetchTasks = async ()=>{
    const response = await fetch('http://localhost:8080/tasks');

    // Para tirar o json da response
    const tasks = response.json();

    // console.log(tasks);

    return tasks;
}


const addTask = async (event) => {
    event.preventDefault();

    const task = {title: inputTask.value}

    await fetch('http://localhost:8080/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    });

    loadTasks();
    inputTask.value = '';
}

const deleteTask = async (id) => {
    // alert('delete task ' + id);

    await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'delete'
    });

    loadTasks();
}

const updateTaks = async ({ id, title, status }) => {

    await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({title, status})
    });

    loadTasks();
}


const formateDate = (dateUTC) => {
    const options = {
        dateStyle: 'long', 
        timeStyle: 'short'
    };

    // const date = new Date(Date.now());
    // const options = {
    //     weekday: 'short',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    // };
    // const dataBrasil = date.toLocaleString('pt-br', options);

    

    // const date = new Date(dateUTC).toLocaleString('pt-br', options);
    const date = new Date(dateUTC).toLocaleString('pt-br', options);

    return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }

    if(innerHTML){
        element.innerHTML = innerHTML;
    }
    return element;
}

const createSelect = (value) => {
    const options = `
        <option value="pendente">pendente</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluido">concluido</option>
    `

    const select = createElement('select', '', options)

    select.value = value

    return select
}

const createRow = (task) => {
    // const titulo = task.title, fazer do jeito abaixo é mais rápido
    const {id, title, created_at, status} = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formateDate(created_at));

    const tdStatus = createElement('td')
    const tdActions = createElement('td')

    const select = createSelect(status)

    select.addEventListener('change', ({target})=> updateTaks({...task, status:target.value}))

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>')
    const removeButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>')

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title;
    editForm.appendChild(editInput);

    // Quando o icone do lápis for selecionado
    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    })

    // Quando for apertado o enter no campo de input do title
    editForm.addEventListener('submit', (event) =>{
        event.preventDefault();

        // id:id <=> id
        updateTaks({ id, title: editInput.value, status })
    });

    
    editButton.classList.add('btn-action');
    removeButton.classList.add('btn-action');


    removeButton.addEventListener('click', () => deleteTask(id))

    tdStatus.appendChild(select)

    tdActions.appendChild(editButton);
    tdActions.appendChild(removeButton);

    tr.appendChild(tdTitle)
    tr.appendChild(tdCreatedAt)
    tr.appendChild(tdStatus)
    tr.appendChild(tdActions)


    return tr;

}

const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach(task => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);
loadTasks();