import {v4 as uuidV4} from "uuid"

type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
  };

const list = document.querySelector<HTMLUListElement>("#list");

// There is two ways to define the HTML element.
// const form = document.querySelector<HTMLFormElement>("#new-task-form");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;

const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
    e.preventDefault();

    if(input?.value == "" || input?.value == null) return undefined;

    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed : false,
        createdAt: new Date()
    }

    tasks.push(newTask)

    addListItem(newTask)
    saveTasks()
    input.value = "";
});

function addListItem(task: Task) {
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    const deleteBtn = document.createElement("button")
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
        saveTasks()
    })
    checkbox.type = "checkbox"
    checkbox.checked = task.completed

    deleteBtn.textContent = "delete"
    deleteBtn.addEventListener("click", () => deleteTask(task.id))
    label.append(checkbox, task.title, deleteBtn)
    item.append(label)
    list?.append(item)
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
    const taskJSON = localStorage.getItem("TASKS")
    if(taskJSON == null) return []
    return JSON.parse(taskJSON)
}

function deleteTask(taskID: string){
    const objWithIdIndex = tasks.findIndex((obj) => obj.id === taskID);
    console.log(objWithIdIndex);
    tasks.splice(objWithIdIndex, 1);
    saveTasks()
}