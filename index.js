let tasks = [];
const tastList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const taskCounter = document.getElementById('tasks-counter');
console.log('working');

function renderList(){

}

function toggleTask(taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId
    });

    if(task.length >0){
        const currentTask = task[0];
        currentTask.done =  !currentTask.done;
        renderList();
        showNotification('task toggled successfuly');
        return;
    }
    showNotification("task can't be toggled");
    return;
}

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
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
          text,
          id : Date.now().toString(),
          done : false
        }

        e.target.value = '';
        addTask(task);
    }
}

addTaskInput.addEventListener('keyup',handleInputKeypress);