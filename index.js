let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const taskCounter = document.getElementById('tasks-counter');

function fatchTodos(){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function(response){
        // console.log(response);
        return response.json();
    }).then(function(data){
        // console.log(data);
        tasks = data.slice(0,10);
        renderList(); 
    }).catch(function(error){
        console.log('error',error)
    })
}

function addTaskToDom(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.completed? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="./assets/delete-256.png" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}


function renderList(){
    tasksList.innerHTML ='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDom(tasks[i]);
    }
    taskCounter.innerHTML = tasks.length;
}

function toggleTask(taskId){
    const task = tasks.filter(function(task){
        return task.id === Number(taskId)
    });

    if(task.length >0){
        const currentTask = task[0];
        currentTask.completed =  !currentTask.completed;
        renderList();
        showNotification('task toggled successfuly');
        return;
    }
    showNotification("task can't be toggled");
    return;
}

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== Number(taskId);
    });

    tasks = newTasks;
    renderList();
    showNotification('task deleted successfully')

}

function addTask(task){
    if(task){
        tasks.push(task);
        console.log(tasks);
        renderList();
        showNotification("task added successfully");
        return;
    }
    showNotification("Blank task can't be added");
   
}

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;

        console.log('text:',text);
        
        if(!text){
            showNotification('Task text can not be empty');
            return;
        }

        const task = {
          title: text,
          id : Date.now().toString(),
          completed : false
        }

        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(e){
    const target = e.target;
    console.log(target);

    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return; 
    }
}

function initializeApp(){
    fatchTodos();
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click',handleClickListener);
}

initializeApp();
