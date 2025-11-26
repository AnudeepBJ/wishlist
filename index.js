let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;


let localData=JSON.parse(localStorage.getItem("todo"));
let todoList=localData || [];


function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

showTodos.addEventListener("click", (e) => {
  let key = e.target.dataset.key;
  let delKey = e.target.dataset.todokey;
  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );

   todoList = todoList.filter((todo) => todo.id != delKey);
  renderTodoList(todoList);

 localStorage.setItem("todo", JSON.stringify(todoList));
  console.log(todoList);
});

addTodoButton.addEventListener("click", (e) => {
  e.preventDefault();
  todo = todoInput.value;
  if (todo.length > 0) {
    todoList.push({ id: uuid(), todo: todo, isCompleted: false });
  }
  todoInput.value = " ";
  renderTodoList(todoList);
  localStorage.setItem("todo",JSON.stringify(todoList));
  todoInput.value=" ";
});

function renderTodoList(todoList) {
  showTodos.innerHTML = todoList.map(
    ({ id, todo, isCompleted }) =>
      `<div class="relative"><input id="item-${id}" type="checkbox" data-key=${id} 
       placeholder="Enter your Wishlist here......" >
    <label for="item-${id}" class="todo todo-text t-pointer ${
        isCompleted ? "checked-todo" : ""
      }" data-key=${id} >${todo}</label>
    <button class="absolute right-0 btn-primary button cursor " type="button" data-todokey=${id} >delete</button></div>`
  );
}
