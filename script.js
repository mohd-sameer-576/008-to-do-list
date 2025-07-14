
let todoitems = document.querySelector(".todoitems");
let todoinput = document.querySelector("#todoinput");
let addbtn = document.querySelector(".addbtn");

// Helper functions for localStorage
function saveListToStorage(list) {
    localStorage.setItem('todoList', JSON.stringify(list));
}
function loadListFromStorage() {
    const data = localStorage.getItem('todoList');
    return data ? JSON.parse(data) : [];
}

let list = loadListFromStorage();

function renderlist(arr){
    todoitems.innerHTML = ""; // Clear existing items
    arr.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <p>${item.text}</p>
            <button class="edit-btn" data-id="${item.id}">✏️</button>
            <button class="delete-btn" data-id="${item.id}">❌</button>
        `;
        todoitems.appendChild(div);
    });

    // Add delete functionality
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const idToDelete = parseInt(button.getAttribute("data-id"));
            list = list.filter(item => item.id !== idToDelete);
            saveListToStorage(list);
            renderlist(list);
        });
    });

    // Add edit functionality
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(button => {
        button.addEventListener("click", function() {
            const idToEdit = parseInt(button.getAttribute("data-id"));
            const item = list.find(item => item.id === idToEdit);
            if (item) {
                const newText = prompt("Edit your task:", item.text);
                if (newText !== null && newText.trim() !== "") {
                    item.text = newText.trim();
                    saveListToStorage(list);
                    renderlist(list);
                }
            }
        });
    });
}

renderlist(list);

function addtodo() {
    const text = todoinput.value.trim();
    if (text === "") return;

    let obj = {
        id: Date.now(),  // better unique id
        text: text,
    };
    list.push(obj);
    todoinput.value = "";  // clear input
    saveListToStorage(list);
    renderlist(list);
}

addbtn.addEventListener('click', addtodo);
