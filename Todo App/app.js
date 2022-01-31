//get all the DOM elements
const getE = (id) => document.getElementById(id);
const form = getE('form');
const input = getE('input');
const todosUl = getE('todos');


const todos = JSON.parse(localStorage.getItem('todos'));


const updateLS = () => {
    const todosEl = document.querySelectorAll('li');
    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}


const addTodo = (todo) => {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {

        const todoEl = document.createElement('li');

        if (todo && todo.completed) {

            todoEl.classList.add('completed');
        }

        todoEl.innerHTML = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');

            updateLS();
        });
        //once the right click button is clicked, todoEl(li)is reemoved
        todoEl.addEventListener("contextmenu", (e) => { //contextmenu is when right click button is click
                e.preventDefault();
                todoEl.remove();

                updateLS();
            })
            // add the created li to the Ul
        todosUl.appendChild(todoEl);

        input.value = ""; // keeps the input empty after each sumbit

        updateLS(); //update the Local storage
    }
}
if (todos) {
    todos.forEach(todo => {
        addTodo();

    })
}


// once the formis sumbitted, add todo
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();

});