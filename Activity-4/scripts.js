console.log("=== Activity 4: Interactive To-Do List (Part 1) ===");

let tasks = [];
let taskIdCounter = 1;

console.log("\n=== ELEMENT CREATION DEMONSTRATIONS ===");

const demoDiv = document.createElement("div");
const demoSpan = document.createElement("span");
const demoButton = document.createElement("button");

console.log("Created div element:", demoDiv);
console.log("Created span element:", demoSpan);
console.log("Created button element:", demoButton);

demoDiv.textContent = "This is a demo div";
demoDiv.id = "demo-div";
demoSpan.innerHTML = "<strong>Demo span with HTML</strong>";
demoButton.textContent = "Demo Button";

console.log("Div after setting properties:", demoDiv);
console.log("Div textContent:", demoDiv.textContent);
console.log("Div id:", demoDiv.id);

console.log("\n=== ELEMENT STYLING DEMONSTRATIONS ===");

demoDiv.style.backgroundColor = "lightblue";
demoDiv.style.padding = "10px";
demoDiv.style.border = "1px solid blue";

demoDiv.classList.add("demo-class");
demoDiv.classList.add("highlighted");

console.log("Added classes:", demoDiv.classList);
console.log("Has 'demo-class':", demoDiv.classList.contains("demo-class"));

demoDiv.classList.remove("highlighted");
demoDiv.classList.toggle("active");

console.log("After modifications:", demoDiv.classList);

demoSpan.style.display = "block";
demoSpan.style.marginTop = "10px";
demoButton.style.display = "block";
demoButton.style.marginTop = "10px";

console.log("\n=== ELEMENT APPENDING DEMONSTRATIONS ===");

const outputDiv = document.getElementById("output");

console.log("Output before:", outputDiv.children.length);

outputDiv.appendChild(demoDiv);
outputDiv.appendChild(demoSpan);
outputDiv.appendChild(demoButton);

console.log("Output after:", outputDiv.children.length);

console.log("\n=== TO-DO LIST FUNCTIONALITY ===");

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    console.log(`Attempting to add task: "${taskText}"`);

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false
    };

    tasks.push(task);

    const listItem = createTaskElement(task);

    document.getElementById("todo-list").appendChild(listItem);

    taskInput.value = "";

    updateTaskStats();
}

function createTaskElement(task) {

    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.setAttribute("data-task-id", task.id);

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;

    const statusSpan = document.createElement("span");
    statusSpan.className = "task-status status-pending";
    statusSpan.textContent = "⏳ Pending";

    listItem.appendChild(textSpan);
    listItem.appendChild(statusSpan);

    listItem.onclick = function () {
        toggleTaskCompletion(task.id);
    };

    return listItem;
}

function toggleTaskCompletion(taskId) {

    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;

    const listItem = document.querySelector(`[data-task-id="${taskId}"]`);
    const statusSpan = listItem.querySelector(".task-status");

    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "✓ Done";
        statusSpan.className = "task-status status-done";
    } else {
        listItem.classList.remove("done");
        statusSpan.textContent = "⏳ Pending";
        statusSpan.className = "task-status status-pending";
    }

    updateTaskStats();
}

function updateTaskStats() {

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById("taskCount").textContent =
        `(${total} task${total !== 1 ? "s" : ""})`;

    document.getElementById("totalTasks").textContent = `Total: ${total}`;
    document.getElementById("completedTasks").textContent = `Completed: ${completed}`;
    document.getElementById("pendingTasks").textContent = `Pending: ${pending}`;
}

document.getElementById("taskInput").onkeydown = function (event) {
    if (event.key === "Enter") {
        addTask();
    }
};

console.log("Application initialized successfully.");