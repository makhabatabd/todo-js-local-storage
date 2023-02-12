const ITEMS_CONTAINER = document.getElementById("items");
const ADD_BUTTON = document.getElementById("add");
const ITEM = document.querySelector(".item");
const ADD_ITEM = document.getElementById("add-item");
const ITEM_DESCRIPTION = document.querySelector(".item-description");
const ITEM_COMPLETED = document.querySelector(".item-completed");

const tasks = JSON.parse(localStorage.getItem("todo")) || [];

function getTasks() {
  let task;
  let completed;
  let div;
  ITEMS_CONTAINER.innerHTML = "";
  tasks.forEach((value) => {
    div = document.createElement("div");
    task = document.createElement("input");
    task.value = value.description;
    task.classList.add("item-description");
    completed = document.createElement("input");
    completed.type = "checkbox";
    completed.classList.add("item-completed");
    completed.checked = value.completed;
    div.appendChild(completed);
    div.appendChild(task);
    ITEMS_CONTAINER.appendChild(div);
    task.addEventListener("change", (event) => {
      updateTask(value.id, "description", event.target.value);
    });
    completed.addEventListener("change", (event) => {
      updateTask(value.id, "completed", event.target.checked);
    });
  });
  return tasks;
}

getTasks();

function updateTask(id, key, value) {
  let index = tasks.findIndex((i) => i.id === id);
  if (index !== -1) {
    tasks[index][key] = value;
    setTasks(tasks);
  }
}

function setTasks(tasks) {
  const newTasks = JSON.stringify(tasks);
  localStorage.setItem("todo", newTasks);
}

function addTask(description, completed) {
  tasks.push({
    description: description,
    completed: completed,
    id: Date.now(),
  });
  setTasks(tasks);
  getTasks();
}

ADD_BUTTON.addEventListener("click", () => {
  ITEM.style.display = "block";
  ITEM_DESCRIPTION.value = "";
  ITEM_COMPLETED.checked = false;
});

ADD_ITEM.addEventListener("click", () => {
  const description = ITEM_DESCRIPTION.value;
  const checked = ITEM_COMPLETED.checked;
  addTask(description, checked);
  ITEM.style.display = "none";
});
