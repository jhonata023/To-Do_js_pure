const inputTask = document.querySelector('#inputTask')
const inputTime = document.querySelector('#inputTime')
const inputDate = document.querySelector('#inputDate')

const editInputTask = document.querySelector('#editInputTask')
const editInputTime = document.querySelector('#editInputTime')
const editInputDate = document.querySelector('#editInputDate')
const editId = document.querySelector('#editId')

const titleTask = document.querySelector('#titleTask')
const btnNewTask = document.querySelector('#btnNewTask')
const taskList = document.querySelector('#taskList')
const btnsEdit = document.querySelectorAll('.edit')
const btnSaveTask = document.querySelector('#btnSaveTask')
const btnCancelEdit = document.querySelector('#btnCancelEdit')

const errorMsg = document.querySelector('#errorMsg')
const divNewTask = document.querySelector('#divNewTask')
const divEditTask = document.querySelector('#divEditTask')

let idEdited

let list = [{id: 1, task: 'Estudar', time: '08:00', date: '2025-04-28'}]

class Task {
    id = this.id
    task = this.task
    time = this.time
    date = this.date
}

function renderTasks (data) {
    taskList.innerHTML = ''
    for (let i = 0; i < list.length; i++) {
        taskList.innerHTML += `
        <fieldset>
            <div id="`+ list[i].id +`">
                <h4>`+ list[i].task +`</h4>
                <p>`+ list[i].time +`</p>
                <p>`+ list[i].date +`</p>
                <button onclick="btnDoneTask(`+ list[i].id +`)">Concluir</button>
                <button class="edit" onclick="btnEditTask(`+ list[i].id +`)">Editar</button>
                <button class="delete" onclick="deleteTask(`+ list[i].id +`)">Excluir</button>
            </div>
        </fieldset>`
    }
}
function deleteTask (id) {
    list = list.filter(task => task.id !== id)
    renderTasks(list)
}
function btnEditTask (id) {
    divNewTask.style.display = 'none'
    divEditTask.style.display = 'block'
    titleTask.innerText = 'Editar Tarefa'
    taskList.parentNode.style.display = 'none'

    idEdited = id
    const taskEdit = list.filter(task => task.id === id)
    const index = list.findIndex(task => task.id === id)
    
    editId.value = id
    editInputTask.value = taskEdit[0].task
    editInputTime.value = taskEdit[0].time
    editInputDate.value = taskEdit[0].date
}
function btnDoneTask (id) {
    const task = document.getElementById(id)

    if (task.classList.contains('complete')) task.classList.remove('complete')
    else task.classList.add('complete')
}
function clearInputNewTask () {
    inputTask.value = ''
    inputTime.value = ''
    inputDate.value = ''
}

renderTasks(list)

btnNewTask.addEventListener('click', () => {
    const newTask = new Task()
    let verify = true
    
    if (list.length > 0) {
        newTask.id = list.at(-1).id + 1
    } else {
        newTask.id = 1
    }

    inputTask.value != '' ? newTask.task = inputTask.value : verify = false
    inputTime.value != '' ? newTask.time = inputTime.value : verify = false
    inputDate.value != '' ? newTask.date = inputDate.value : verify = false

    if (verify) {
        list.push(newTask)
    } else {
        errorMsg.innerText = 'Preencha todos os campos'
        errorMsg.style.display = 'block'

        setInterval(() => {
            errorMsg.style.display = 'none'
        }, 3000)
    }

    renderTasks(list)
    clearInputNewTask()
})
btnCancelEdit.addEventListener('click', () => {
    divNewTask.style.display = 'block'
    divEditTask.style.display = 'none'
    titleTask.innerText = 'Nova Tarefa'
    taskList.parentNode.style.display = 'block'

    editId.value = ''
    editInputTask.value = ''
    editInputTime.value = ''
    editInputDate.value = ''
})
btnSaveTask.addEventListener('click', () => {
    list.forEach(item => {
        if(item.id === idEdited) {
            item.task = editInputTask.value
            item.time = editInputTime.value
            item.date = editInputDate.value
        }
    })

    divNewTask.style.display = 'block'
    divEditTask.style.display = 'none'
    titleTask.innerText = 'Nova Tarefa'
    taskList.parentNode.style.display = 'block'

    renderTasks(list)
})