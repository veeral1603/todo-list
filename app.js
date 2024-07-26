'use script';

const inputBox = document.querySelector('.input-container input');
const btnAdd = document.querySelector('.input-container button');
const taskCountElement = document.querySelector('.item-count');
const btnDelete = document.querySelectorAll('.delete');
const todoListContainer = document.querySelector('.todo-list');
const itemCountContainer = document.querySelector('.item-count-container');
const btnRadio = document.querySelectorAll(".radio");

let taskCount;
let radioState;



const saveData = function()
{
    localStorage.setItem("data" , todoListContainer.innerHTML);
    localStorage.setItem("count" , taskCount);
}

const showData = function()
{
    todoListContainer.innerHTML = localStorage.getItem("data");
    if(!localStorage.getItem("count"))   
    {
        console.log("ok");
        taskCount = 0;
        localStorage.setItem("count" , 0);
        taskCountElement.innerHTML = localStorage.getItem("count");
    }

    else
    {
        taskCount = localStorage.getItem("count");
        taskCountElement.innerHTML = localStorage.getItem("count");
    }


    
}


const addTask = function()
{

    if(inputBox.value == '') alert('Task can\'t be empty!');

    else if(inputBox.value.length > 40) alert("Task should be less than 40 characters!");

    else 
    {
    let newTask = `<div class="todo-row">
                    <span class="material-symbols-outlined radio">radio_button_unchecked</span>
                    <span class="material-symbols-outlined radio hidden other-radio">radio_button_checked</span>
                    <p class="todo-row-task">${inputBox.value}</p>
                    <span class="material-symbols-outlined delete">delete</span>   
    </div>`;

            
    todoListContainer.insertAdjacentHTML('afterbegin' , newTask);
    
    taskCount++;
    taskCountElement.innerHTML = taskCount;

    inputBox.value = '';
    saveData()
    }
}

document.addEventListener('keydown' , (e) => {
    if (e.key === "Enter") addTask();
})


btnAdd.addEventListener('click' , addTask);



todoListContainer.addEventListener('click' , (e) => {


    if (e.target.classList.contains("radio"))
    {   
        radioState = e.target.innerHTML == "radio_button_unchecked" ? "checked" : "unchecked";
        e.target.innerHTML = `radio_button_${radioState}`;

        if(radioState == "checked")
        {
            taskCount--;
            taskCountElement.innerHTML = taskCount;
        
        }
        if( radioState == "unchecked")
        {
            taskCount++;
            taskCountElement.innerHTML = taskCount;
            
        }


        e.target.parentElement.querySelector('.todo-row-task').classList.toggle("checked");
        saveData()
    }

    if (e.target.classList.contains("delete")) 
    {
        e.target.parentElement.remove();
            

        if(e.target.parentElement.querySelector(".radio").innerHTML === "radio_button_checked");
        else
        {
            taskCount--;
            taskCountElement.innerHTML = taskCount;
        
        }
        
        saveData()
    }
})


showData();