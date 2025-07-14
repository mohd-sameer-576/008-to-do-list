
let todoitems = document.querySelector(".todoitems");
let todoinput = document.querySelector("#todoinput");
let addbtn = document.querySelector(".addbtn");

let list = [
];

function renderlist(arr){
    todoitems.innerHTML = ""; // Clear existing items
    arr.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <p>${item.text}</p>
            <button data-id="${item.id}">❌</button>
        `;
        todoitems.appendChild(div);
    });

    // Add delete functionality
    const deleteButtons = document.querySelectorAll(".item button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const idToDelete = parseInt(button.getAttribute("data-id"));
            list = list.filter(item => item.id !== idToDelete);
            renderlist(list);
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
    renderlist(list);
}

addbtn.addEventListener('click', addtodo);
