document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("create-task-form");
    const taskList = document.getElementById("tasks");
    const tasksArray = []; // Array to hold tasks
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleAddTask();
    });
  
    // Sorting buttons
    const sortAscBtn = document.getElementById("sort-asc");
    const sortDescBtn = document.getElementById("sort-desc");
  
    sortAscBtn.addEventListener("click", () => {
      sortTasks("asc");
    });
  
    sortDescBtn.addEventListener("click", () => {
      sortTasks("desc");
    });
  
    function handleAddTask() {
      const taskInput = document.getElementById("new-task-description");
      const priority = document.getElementById("priority").value;
  
      // Create a task object and push to tasksArray
      const task = {
        description: taskInput.value,
        priority: priority
      };
      tasksArray.push(task);
  
      // Clear input field
      taskInput.value = '';
  
      // Render tasks
      renderTasks();
    }
  
    function renderTasks() {
      // Clear current tasks on the screen
      taskList.innerHTML = '';
  
      // Loop through tasksArray and render each task
      tasksArray.forEach((task, index) => {
        const newTask = document.createElement("li");
        newTask.textContent = task.description;
  
        // Set task color based on priority
        if (task.priority === "high") newTask.style.color = "red";
        else if (task.priority === "medium") newTask.style.color = "yellow";
        else newTask.style.color = "green";
  
        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          deleteTask(index);
        });
  
        newTask.appendChild(deleteBtn);
        taskList.appendChild(newTask);
      });
    }
  
    function deleteTask(index) {
      // Remove task from the array
      tasksArray.splice(index, 1);
      renderTasks();
    }
  
    function sortTasks(order) {
      tasksArray.sort((a, b) => {
        const priorityValues = { high: 1, medium: 2, low: 3 };
        return order === "asc"
          ? priorityValues[a.priority] - priorityValues[b.priority]
          : priorityValues[b.priority] - priorityValues[a.priority];
      });
      renderTasks();
    }
  });
  