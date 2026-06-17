const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#search button");
const filterBtn = document.querySelector("#filter-select");
const completedCounter = document.querySelector("#completed-counter");
const uncompletedCounter = document.querySelector("#uncompleted-counter");

let currentEditElement;

// FUNÇÕES

const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("btn", "btn-success", "finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-info", "edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    todo.appendChild(editBtn);

    const deletBtn = document.createElement("button");
    deletBtn.classList.add("btn", "btn-danger", "remove-todo");
    deletBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
    todo.appendChild(deletBtn);

    if (done) {
        todo.classList.add("done");
    }

    todoList.appendChild(todo);

    if (save) {
        saveAllTodosToLocalStorage();
    }

    todoInput.value = "";
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    if (currentEditElement) {
        currentEditElement.innerText = text;
    }
    saveAllTodosToLocalStorage();
};

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        const normalizedSearch = search.toLowerCase();
        todo.style.display = "flex";

        if (!todoTitle.includes(normalizedSearch)) {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        todo.style.display = "flex";

        switch (filterValue) {
            case "all":
                todo.style.display = "flex";
                break;
            case "done":
                // Se NÃO tiver a classe 'done', esconde
                if (!todo.classList.contains("done")) {
                    todo.style.display = "none";
                }
                break;
            case "todo":
                // Se TIVER a classe 'done', esconde
                if (todo.classList.contains("done")) {
                    todo.style.display = "none";
                }
                break;
        }
    });
};

// EVENTOS

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value.trim();

    if (inputValue) {
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest(".todo");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
        saveAllTodosToLocalStorage();
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
        saveAllTodosToLocalStorage();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        currentEditElement = parentEl.querySelector("h3");
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});


searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;
    getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;
    filterTodos(filterValue);
});

const updateCounters = () => {
    const totalTodos = document.querySelectorAll(".todo").length;
    const doneTodos = document.querySelectorAll(".todo.done").length;
    completedCounter.innerText = doneTodos;
    uncompletedCounter.innerText = totalTodos - doneTodos;
};

const saveAllTodosToLocalStorage = () => {
    const todosElements = document.querySelectorAll(".todo");
    const todosList = [];

    todosElements.forEach((todoEl) => {
        const text = todoEl.querySelector("h3").innerText;
        const done = todoEl.classList.contains("done") ? 1 : 0;

        todosList.push({ text: text, done: done });
    });

    localStorage.setItem("todos", JSON.stringify(todosList));
    updateCounters();
};

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
    updateCounters();
};

loadTodos();