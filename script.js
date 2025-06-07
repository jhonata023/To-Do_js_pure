const inputTask = document.querySelector('#inputTask')
const inputStart = document.querySelector('#inputStart')
const inputFinish = document.querySelector('#inputFinish')
const inputDate = document.querySelector('#inputDate')

const editInputTask = document.querySelector('#editInputTask')
const editInputFinish = document.querySelector('#editInputFinish')
const editInputStart = document.querySelector('#editInputStart')
const editInputDate = document.querySelector('#editInputDate')
const editId = document.querySelector('#editId')

const titleTask = document.querySelector('#titleTask')
const btnNewTask = document.querySelector('#btnNewTask')
const taskList = document.querySelector('#taskList')
const btnsEdit = document.querySelectorAll('.edit')
const btnSaveTask = document.querySelector('#btnSaveTask')
const btnCancelEdit = document.querySelectorAll('.btnCancelEdit')

const errorMsg = document.querySelector('#errorMsg')
const divNewTask = document.querySelector('#divNewTask')
const divEditTask = document.querySelector('#divEditTask')
const addTask = document.querySelector('#add')

const date = new Date()
const currentMonth = date.getMonth()
const year = date.getFullYear()

let selectedMonth = currentMonth
let selectedYear = year
let nameMonth

let months = [
    {name: 'JANEIRO', number: 0},
    {name: 'FEVEREIRO', number: 1},
    {name: 'MARÇO', number: 2},
    {name: 'ABRIL', number: 3},
    {name: 'MAIO', number: 4},
    {name: 'JUNHO', number: 5},
    {name: 'JULHO', number: 6},
    {name: 'AGOSTO', number: 7},
    {name: 'SETEMBRO', number: 8},
    {name: 'OUTUBRO', number: 9},
    {name: 'NOVEMBRO', number: 10},
    {name: 'DEZEMBRO', number: 11}
]

const calendar = document.querySelector('#calendar')

let idEdited

let list = []

class Task {
    constructor({id, task, start, finish, date}) {
        this.id = id
        this.task = task,
        this.start = start,
        this.finish = finish,
        this.date = date
    }
}

list.push(new Task ({
    id: 1,
    task: 'Estudar',
    start: '08:00',
    finish: '09:00',
    date: '2025-06-28'
}))
list.push(new Task ({
    id: 2,
    task: 'Cozinhar',
    start: '12:00',
    finish: '13:00',
    date: '2025-06-28'
}))
list.push(new Task ({
    id: 3,
    task: 'Arrumar casa',
    start: '14:00',
    finish: '15:00',
    date: '2025-06-28'
}))

function taskInDate () {
    const tds = document.querySelectorAll('td')
    list.forEach(task => {
        if (selectedMonth == (task.date.slice(5, 7) - 1) && selectedYear == task.date.slice(0, 4)) {
            tds.forEach(td => {
                if (td.innerText.includes(task.date.slice(8, 10))) {
                    td.innerHTML += `
                    <div class="bg-warning pl-2 pr-2 pt-1 pb-1 mb-1 rounded text-truncate" style="font-size: 12px; max-width: 60px;">
                    `+ task.task +`
                    </div>`
                }
            })
        }
    })
}
function getAnyMonth (reference) {
    months.forEach(month => {
        if (month.number == reference) {
            nameMonth = month.name
        }
    })
}
getAnyMonth(currentMonth)
function daysMonth (year, month) {
    return new Date(year, month + 1, 0).getDate()
}
function firstDay (year, month) {
    return new Date(year, month, 1).getDay()
}
function renderCalendar () {
    calendar.innerHTML = `
    <div class="d-flex justify-content-around mb-5 p-1 shadow rounded">
        <h3 class="rounded p-2 m-0 control-month" onclick="previousMonth()"><</h3><h3 class="m-0 p-2 title">` + nameMonth + ' ' + selectedYear + `</h3><h3 class="rounded p-2 m-0 control-month" onclick="nextMonth()">></h3>
    </div>
    
    <table class="table table-light table-bordered shadow">
            <thead class="table-borderless">
                <tr class="table-primary text-center">
                    <th scope="col">Dom</th>
                    <th scope="col">Seg</th>
                    <th scope="col">Ter</th>
                    <th scope="col">Qua</th>
                    <th scope="col">Qui</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Sáb</th>
                </tr>
            </thead>
            <tbody id="body-calendar">
                <tr id="first-week"></tr>
            </tbody>
        </table>`

    const bodyCalendar = document.querySelector('#body-calendar')

    let weeks = Math.round((daysMonth(selectedYear, selectedMonth) + firstDay(selectedYear, selectedMonth)) / 7) + 1

    for(let index = 0; index < weeks; index++) {
        bodyCalendar.innerHTML += `
            <tr id="week`+ (index + 1) +`"></tr>`
    }
    const firstWeek = document.querySelector('#week1')
    const secondWeek = document.querySelector('#week2')
    const thirthWeek = document.querySelector('#week3')
    const fourthWeek = document.querySelector('#week4')
    const fivethWeek = document.querySelector('#week5')
    const sixthWeek = document.querySelector('#week6')

    if (firstDay(selectedYear, selectedMonth) == 0) {
        firstWeek.innerHTML = `
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>`
    } else if (firstDay(selectedYear, selectedMonth) == 1) {
        firstWeek.innerHTML = `
            <td></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>`
    } else if (firstDay(selectedYear, selectedMonth) == 2) {
        firstWeek.innerHTML = `
            <td colspan="2"></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>`
    } else if (firstDay(selectedYear, selectedMonth) == 3) {
        firstWeek.innerHTML = `
            <td colspan="3"></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>`
    } else if (firstDay(selectedYear, selectedMonth) == 4) {
        firstWeek.innerHTML = `
            <td colspan="4"></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>`
    } else if (firstDay(selectedYear, selectedMonth) == 5) {
        firstWeek.innerHTML = `
            <td colspan="5"></td>
            <td>1</td>
            <td>2</td>`
    } else if (firstDay(selectedYear, selectedMonth) == 6) {
        firstWeek.innerHTML = `
            <td colspan="6"></td>
            <td>1</td>`
    }

    let nextDay = 8 - firstDay(selectedYear, selectedMonth)
    for (let i = nextDay; i >= nextDay && i < nextDay + 7; i++) {
        secondWeek.innerHTML += `
        <td>`+ i +`</td>`
    }

    nextDay = 15 - firstDay(selectedYear, selectedMonth)
    for (let i = nextDay; i >= nextDay && i < nextDay + 7; i++) {
        thirthWeek.innerHTML += `
        <td>`+ i +`</td>`
    }

    nextDay = 22 - firstDay(selectedYear, selectedMonth)
    for (let i = nextDay; i >= nextDay && i < nextDay + 7; i++) {
        fourthWeek.innerHTML += `
        <td>`+ i +`</td>`
    }

    nextDay = 29 - firstDay(selectedYear, selectedMonth)
    for (let i = nextDay; i >= nextDay && i < nextDay + 7 && i <= daysMonth(selectedYear, selectedMonth); i++) {
        fivethWeek.innerHTML += `
        <td>`+ i +`</td>`
    }

    nextDay = 36 - firstDay(selectedYear, selectedMonth)
    for (let i = nextDay; i >= nextDay && i < nextDay + 7 && i <= daysMonth(selectedYear, selectedMonth); i++) {
        sixthWeek.innerHTML += `
        <td>`+ i +`</td>`
    }

    // renderTasks()
    taskInDate()
}
function renderTasks (data) {
    taskList.innerHTML = ''
    for (let i = 0; i < list.length; i++) {
        if (selectedMonth == (list[i].date.slice(5, 7) - 1) && selectedYear == list[i].date.slice(0, 4)) {
            taskList.innerHTML += `
            <fieldset>
                <div id="`+ list[i].id +`" class="d-flex border-bottom p-2">
                    <h4 class="m-0 align-content-center text-capitalize" style="width: 25%;">`+ list[i].task +`</h4>
                    <p class="m-0 align-content-center" style="width: 25%;">`+ list[i].start +`</p>
                    <p class="m-0 align-content-center" style="width: 25%;">`+ list[i].finish +`</p>
                    <p class="m-0 align-content-center" style="width: 25%;">`+ list[i].date +`</p>
                    <div class="d-flex flex-row justify-content-around" style="width: 25%;">
                        <button class="btn btn-success" onclick="btnDoneTask(`+ list[i].id +`)">Concluir</button>
                        <button class="edit btn btn-warning" onclick="btnEditTask(`+ list[i].id +`)">Editar</button>
                        <button class="delete btn btn-danger" onclick="deleteTask(`+ list[i].id +`)">Excluir</button>
                    </div>
                </div>
            </fieldset>`
        }
    }
    renderCalendar()
}
function previousMonth () {
    selectedMonth -= 1
    if (selectedMonth < 0) {
        selectedMonth = 11
        selectedYear -= 1
    }
    getAnyMonth(selectedMonth)
    renderTasks()
}
function nextMonth () {
    selectedMonth += 1
    if (selectedMonth > 11) {
        selectedMonth = 0
        selectedYear += 1
    }
    getAnyMonth(selectedMonth)
    renderTasks()
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

    document.querySelector('#sectionNewTask').style.display = 'block'
    document.querySelector('#sectionTasks').style.display = 'none'

    idEdited = id
    const taskEdit = list.filter(task => task.id === id)
    
    editId.value = id
    editInputTask.value = taskEdit[0].task
    editInputStart.value = taskEdit[0].start
    editInputFinish.value = taskEdit[0].finish
    editInputDate.value = taskEdit[0].date
}
function btnDoneTask (id) {
    const task = document.getElementById(id)

    if (task.classList.contains('complete')) task.classList.remove('complete')
    else task.classList.add('complete')
}
function clearInputNewTask () {
    inputTask.value = ''
    inputStart.value = ''
    inputFinish.value = ''
    inputDate.value = ''
}
function cancelEdit (option) {
    event.preventDefault()
    document.querySelector('#sectionNewTask').style.display = 'none'
    document.querySelector('#sectionTasks').style.display = 'block'
    
    if (option == 'edit') {
        divNewTask.style.display = 'block'
        divEditTask.style.display = 'none'
        titleTask.innerText = 'Nova Tarefa'
        taskList.parentNode.style.display = 'block'

        editId.value = ''
        editInputTask.value = ''
        editInputStart.value = ''
        editInputFinish.value = ''
        editInputDate.value = ''
    } else if (option == 'new') {
        inputTask.value = ''
        inputStart.value = ''
        inputFinish.value = ''
        inputDate.value = ''
    }
}

renderTasks(list)

btnNewTask.addEventListener('click', () => {
    event.preventDefault()
    if (inputTask.value != '' && inputStart.value != '' && inputDate.value != '' && inputFinish != '') {
        if (list.length > 0) {
            list.push(new Task({
                id: list.at(-1).id + 1,
                task: inputTask.value,
                start: inputStart.value,
                finish: inputFinish.value,
                date: inputDate.value
            }))
        } else {
            list.push(new Task({
                id: 1,
                task: inputTask.value,
                start: inputStart.value,
                finish: inputFinish.value,
                date: inputDate.value
            }))
        }

        document.querySelector('#sectionNewTask').style.display = 'none'
        document.querySelector('#sectionTasks').style.display = 'block'
    } else {
        errorMsg.style.display = 'block'
        errorMsg.innerText = 'Preencha todos os campos corretamente'

        setTimeout(() => {
            errorMsg.style.display = 'none'
        }, 3000)
    }

    renderTasks(list)
    clearInputNewTask()
})
btnSaveTask.addEventListener('click', () => {
    event.preventDefault()
    list.forEach(item => {
        if(item.id === idEdited) {
            item.task = editInputTask.value
            item.start = editInputStart.value
            item.finish = editInputFinish.value
            item.date = editInputDate.value
        }
    })

    divNewTask.style.display = 'block'
    divEditTask.style.display = 'none'
    titleTask.innerText = 'Nova Tarefa'
    taskList.parentNode.style.display = 'block'

    document.querySelector('#sectionNewTask').style.display = 'none'
    document.querySelector('#sectionTasks').style.display = 'block'

    renderTasks(list)
})
addTask.addEventListener('click', () => {
    document.querySelector('#sectionNewTask').style.display = 'block'
    document.querySelector('#sectionTasks').style.display = 'none'
})