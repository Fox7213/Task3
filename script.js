document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    //Извлечение задачи из Locol storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    //Отображение задач из Local storage
    function displayTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function(task, index) {
            const li = document.createElement("li");
            li.textContent = task;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Удалить";
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.addEventListener("click", function() {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
            });
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    displayTasks();

    //Добавление новых задач
    addTaskBtn.addEventListener("click", function() {
        if(taskInput.value !== "") {
            tasks.push(taskInput.value);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    });

    //Добавление задач при помощи Enter
    taskInput.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            addTaskBtn.click();
        }
    });
});