//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addToList);
// delete todo
todoList.addEventListener("click", deleteCheck);
// filter todo
filterOption.addEventListener("click", filterTodo);

//Functions
function addToList() {
  /*Todo Div */
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");

  newTodo.innerText = todoInput.value;
  saveLocalTodos(todoInput.value);
  // clear todo input value
  todoInput.value = "";

  // append li into div
  todoDiv.appendChild(newTodo);

  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerText = "Done";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  todoList.appendChild(todoDiv);
}

//Delete & Check TODO
function deleteCheck(e) {
  const item = e.target;

  //DELETE
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  //CHECK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
//Filter todo
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        break;
    }
  });
}

//set and check on localstorage
function saveLocalTodos(todo) {
  //CHECK -- Do i already have thins in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//get back over todos in localstorage
function getTodos() {
  //CHECK -- Do i already have thins in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");

    newTodo.innerText = todo;
    // append li into div
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerText = "Done";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
  });
}
//remove from localstorage
function removeLocalTodos(todo) {
  //CHECK -- Do i already have thins in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  // const todoIndex = todo;
}
