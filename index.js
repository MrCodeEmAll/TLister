// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const tasksArray = []; // Array to store tasks

  // Event listener for form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddTask();
  });

  // Sorting buttons event listeners
  const sortAscBtn = document.getElementById("sort-asc");
  const sortDescBtn = document.getElementById("sort-desc");

  sortAscBtn.addEventListener("click", () => {
    sortTasks("asc");
  });

  sortDescBtn.addEventListener("click", () => {
    sortTasks("desc");
  });

  // Function to handle task addition
  function handleAddTask() {
    const taskInput = document.getElementById("new-task-description");
    const priority = document.getElementById("priority").value;

    // Create a task object and add to tasksArray
    const task = {
      description: taskInput.value,
      priority: priority
    };
    tasksArray.push(task);

    // Clear input field after task is added
    taskInput.value = '';

    // Render tasks to the DOM
    renderTasks();
  }

  // Function to render tasks on the page
  function renderTasks() {
    // Clear the current task list
    taskList.innerHTML = '';

    // Loop through tasksArray and create list items for each task
    tasksArray.forEach((task, index) => {
      const newTask = document.createElement("li");
      newTask.textContent = task.description;

      // Set the color based on priority
      if (task.priority === "high") newTask.style.color = "red";
      else if (task.priority === "medium") newTask.style.color = "yellow";
      else newTask.style.color = "green";

      // Create a delete button for each task
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteTask(index);
      });

      // Append the delete button to the task list item
      newTask.appendChild(deleteBtn);

      // Add the task list item to the task list in the DOM
      taskList.appendChild(newTask);
    });
  }

  // Function to delete a task from the array and update the DOM
  function deleteTask(index) {
    tasksArray.splice(index, 1); // Remove the task from the array
    renderTasks(); // Re-render tasks
  }

  // Function to sort tasks based on priority
  function sortTasks(order) {
    tasksArray.sort((a, b) => {
      const priorityValues = { high: 1, medium: 2, low: 3 };
      return order === "asc"
        ? priorityValues[a.priority] - priorityValues[b.priority]
        : priorityValues[b.priority] - priorityValues[a.priority];
    });
    renderTasks(); // Re-render tasks after sorting
  }
});
