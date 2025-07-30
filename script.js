const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText.length > 0) {
       const todoObject = {
        text: todoText,
        completed: false
       }
       allTodos.push(todoObject);
       updateTodoList();
       saveTodos();
       todoInput.value = ''; 
    }
}

function updateTodoList() {
    todoListUl.innerHTML = ''; 
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUl.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-" +todoIndex;
    const todoLi = document.createElement('li');
    const todoText = todo.text;
    todoLi.className = 'todo'
    todoLi.innerHTML = `
        <input type="checkbox" id="${todoId}" />
        <label class="custom-checkbox" for="${todoId}">
            <i class="fa-solid fa-check" fill="transparent"></i>
        </label>
        <label for="${todoId}" class="todo-text">${todo.text}</label>
        <button class="delete-button" onclick="deleteTodo(${todoIndex})">
            <i class="fa-solid fa-trash"></i>
        </button>
    `
    const deleteButton = todoLi.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLi.querySelector('input');
    checkbox.addEventListener('change', () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;
    return todoLi;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, index) => index !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}