const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.task');

function createLi(){
    const li = document.createElement('li');
    return li;
};

function cleanInput(){
    inputTask.value = '';
    inputTask.focus();
};

function createBtnDelete(li){
    li.innerText += ' ';
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Apagar';
    btnDelete.setAttribute('class', 'delete')
    li.appendChild(btnDelete);
};

inputTask.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if(!inputTask.value) return;
        createTask(inputTask.value);
    }
});

function createTask(textInput){
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    cleanInput();
    createBtnDelete(li);
    saveTasks();
};

btnTask.addEventListener('click', function(e) {
    if(!inputTask.value) return;

     createTask(inputTask.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('delete')){
        el.parentElement.remove();
        saveTasks();
    }
});

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        taskList.push(taskText);
    }

    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', tasksJSON);

}

function addSaveTasks(){
    const tasks = localStorage.getItem('tasks');
    const tasksList = JSON.parse(tasks);
    
    for (task of tasksList) {
        createTask(task);
    }
}

addSaveTasks();