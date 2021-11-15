const formulario = document.querySelector("#formulario");
const renderTodo = document.querySelector("#renderTodo");
const templateTodo = document.querySelector("#templateTodo").content;
const alert = document.querySelector(".alert-danger");

let todos = [];

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");

  const data = new FormData(formulario);
  const [todo] = [...data.values()];

  if (!todo.trim()) {
    console.log("COMPLETE EL CAMPO");
    alert.classList.remove("d-none");
    return;
  }

  agregarTodo(todo);
  renderTodos();
});

const agregarTodo = (todo) => {
  const objetoTodo = {
    nombre: todo,
    id: `${Date.now()}`,
  };

  todos.push(objetoTodo);
};

const renderTodos = () => {
  //LocalStorageRender

  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodo.textContent = "";

  const fragment = document.createDocumentFragment();

  todos.forEach((item) => {
    const clone = templateTodo.cloneNode(true);

    clone.querySelector(".lead").textContent = item.nombre;
    clone.querySelector(".btn-danger").dataset.id = item.id;

    fragment.appendChild(clone);
  });
  renderTodo.appendChild(fragment);
};

document.addEventListener("click", (e) => {
  //   console.log(e.target.dataset);
  //   console.log(e.target.matches(".btn-danger"));

  if (e.target.matches(".btn-danger")) {
    todos = todos.filter((item) => item.id !== e.target.dataset.id);
  }
  renderTodos();
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    renderTodos();
  }
});
