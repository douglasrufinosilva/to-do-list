const taskInput = document.querySelector('.taskInput')
const btnAddTask = document.querySelector('.btnAddTask')
const listTasks = document.querySelector('.listTasks')

let itemsList = []

function addNewTask() {
    
    if(taskInput.value !== '') {
        itemsList.push( {
        task: taskInput.value,
        completed: false
    } )

    taskInput.value = ''
    showTask()
    taskInput.classList.remove('emptyInput')
    } else (
        taskInput.classList.add('emptyInput')
    )
}

function showTask() {

    let newTask = ''
    
    itemsList.forEach((item, index) => {
        newTask += `
            <li class="task ${item.completed && "done"}">
                <img src="img/checked.png" alt="Task completed" onClick="completedTask(${index})">
                <p>${item.task}</p>
                <img src="img/trash.png" alt="Delete task" onClick="deleteItem(${index})">
            </li>`
    })

    listTasks.innerHTML = newTask

    localStorage.setItem('lista', JSON.stringify(itemsList))
}

function completedTask(index) {
    itemsList[index].completed = !itemsList[index].completed
    showTask()
}

function deleteItem(index) {
    itemsList.splice(index, 1)
    showTask()
}

function reloadTasks() {
    const localStorageTasks = localStorage.getItem('lista')

    if (localStorageTasks) {

        itemsList = JSON.parse(localStorageTasks)
    }
    showTask()
}


reloadTasks()
btnAddTask.addEventListener('click', addNewTask)