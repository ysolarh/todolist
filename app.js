const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
let todoArr = [];

function saveTodos() {
  const todoString = JSON.stringify(todoArr);
  localStorage.setItem("myTodos", todoString);
}

function loadTodos() {
  const myTodos = localStorage.getItem("myTodos");
  if (myTodos !== null) {
    todoArr = JSON.parse(myTodos);
    displayTodos();
  }
}
loadTodos();

function handleTodoDelBtnClick(todoClickedId) {
  todoArr = todoArr.filter((item) => {
    return item.todoId !== todoClickedId;
  });
  displayTodos();
  saveTodos();
}

function handleTodoItemClick(todoClickedId) {
  todoArr = todoArr.map((item) => {
    if (item.todoId === todoClickedId) {
      return {
        ...item,
        todoDone: !item.todoDone,
      };
    } else {
      return item;
    }
  });
  displayTodos();
  saveTodos();
}

function displayTodos() {
  todoList.textContent = "";
  todoArr.forEach((item) => {
    const todoItem = document.createElement("li");
    const todoLabel = document.createElement("span");
    const todoCheck = document.createElement("span");
    const todoDelBtn = document.createElement("span");
    todoLabel.setAttribute("class", "todo-label");
    todoCheck.setAttribute("class", "todo-check");
    todoDelBtn.setAttribute("class", "todo-del");
    todoCheck.innerHTML = "<i class='fa-solid fa-paw'></i>";
    todoLabel.textContent = item.todoText;
    todoDelBtn.innerHTML = "&#9003;";
    todoList.appendChild(todoItem);
    todoItem.appendChild(todoLabel);
    todoItem.prepend(todoCheck);
    todoItem.appendChild(todoDelBtn);

    todoItem.addEventListener("click", () => {
      handleTodoItemClick(item.todoId);
    });

    if (item.todoDone) {
      todoItem.classList.add("done");
    } else {
      todoItem.classList.add("undone");
    }

    todoDelBtn.addEventListener("click", () => {
      handleTodoDelBtnClick(item.todoId);
    });
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const toBeAdded = {
    todoText: todoForm.todo.value,
    todoId: new Date().getTime(),
    todoDone: false,
  };
  todoForm.todo.value = "";
  todoArr.push(toBeAdded);
  displayTodos();
  saveTodos();
});
