/// <reference path="jquery-3.4.1.js" />

function showTodos1() {
    const n = +prompt("Enter number of TODOs to show: ");
    getTodos(n)
        .then(todos => displayTodos(todos))
        .catch(err => alert("Error: " + err.status));
}

async function showTodos2() {
    try {
        const n = +prompt("Enter number of TODOs to show: ");
        const todos = await getTodos(n);
        displayTodos(todos);
    }
    catch (err) {
        alert("Error: " + err.status)
    }
}

function getTodos(n) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/todos",
            success: todos => resolve(todos.slice(0, n)),
            error: err => reject(err)
        });
    });
}

function displayTodos(todos) {
    $("tbody").empty();
    for (const item of todos) {
        const tr = `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.completed}</td>
                </tr>
            `;
        $("tbody").append(tr);
    }
}