const tasksData = JSON.parse(localStorage.getItem("UserTasks")) || [];
let appRunning = true;
let selectedTaskIndex;

while (appRunning) {
  console.log(`Task Management Options:
    1. Add New Task
    2. Show All Tasks
    3. Toggle Task Status
    4. Modify Task Description
    5. Remove Task
    6. Search Tasks by Name
    7. Exit`);

  let userChoice = Number(prompt("Please select an option (1-7):"));

  switch (userChoice) {
    case 1:
      let taskInput = prompt("Enter Task Description:");
      tasksData.push({ description: taskInput, done: false });
      localStorage.setItem("UserTasks", JSON.stringify(tasksData));
      console.log("New task added!");
      break;

    case 2:
      if (tasksData.length === 0) {
        console.log("No tasks to show.");
      } else {
        tasksData.forEach((task, idx) => {
          console.log(
            `${idx + 1}. ${task.description} | ${
              task.done ? "Done" : "Not Done"}`
          );
        });
      }
      break;

    case 3:
      selectedTaskIndex =
        Number(prompt("Enter task number to change status:")) - 1;
      if (tasksData[selectedTaskIndex]) {
        tasksData[selectedTaskIndex].done = !tasksData[selectedTaskIndex].done;
        localStorage.setItem("UserTasks", JSON.stringify(tasksData));
        console.log("Task status updated.");
      } else {
        console.log("Invalid task number.");
      }
      break;

    case 4:
      selectedTaskIndex = Number(prompt("Enter task number to modify:")) - 1;
      if (tasksData[selectedTaskIndex]) {
        tasksData[selectedTaskIndex].description = prompt("Enter new description:");
        localStorage.setItem("UserTasks", JSON.stringify(tasksData));
        console.log("Task description updated.");
      } else {
        console.log("Invalid task number.");
      }
      break;

    case 5:
      selectedTaskIndex = Number(prompt("Enter task number to delete:")) - 1;
      if (tasksData[selectedTaskIndex]) {
        tasksData.splice(selectedTaskIndex, 1);
        console.log("Task removed.");
      } else {
        console.log("Invalid task number.");
      }
      break;

    case 6:
      let searchQuery = prompt("Enter task name to search:").toLowerCase();
      let filteredTasks = tasksData.filter((task) =>
        task.description.toLowerCase().includes(searchQuery)
      );

      if (filteredTasks.length > 0) {
        filteredTasks.forEach((task, idx) => {
          console.log(
            `${idx + 1}. ${task.description} | ${
              task.done ? "Done" : "Not Done"}`
          );
        });
      } else {
        console.log("No tasks found matching that search.");
      }
      break;

    case 7:
      appRunning = false;
      console.log("Exiting Task Management.");
      break;

    default:
      console.log("Please enter a valid option (1-7).");
      break;
  }
}