const input = document.getElementById('input')
const list = document.getElementById('list')
const elementDate = document.getElementById('date')
const clear = document.querySelector(".clear")

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem('TODO');

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    id = 0;
    LIST = [];
}

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}

const today = new Date();

const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
}

elementDate.innerHTML = today.toLocaleDateString('en-US', options);



document.addEventListener('keyup', function(event) {
    if (event.code === 'Enter') {
        const toDo = input.value;

        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                trash: false,
                done: false
            })
            
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = '';
    }
})

function addToDo(toDo, id, done, trash) {
    
    if (trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}"">${toDo}</p>
        <i class="fa fa-trash-o de" job="remove" id="${id}"></i>
    </li>
    `;

    const position = 'beforeend';

    list.insertAdjacentHTML(position, item);
}

clear.addEventListener('click', function(element) {
    localStorage.clear();
    location.reload();
})

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = !LIST[element.id].done;
}

list.addEventListener('click', function(event) {
    const element = event.target; 
    const elementJob = element.attributes.job.value;

    if (elementJob == 'complete') {
        completeToDo(element);
    } else if (elementJob == 'remove') {
        removeToDo(element);
    }

    localStorage.setItem('TODO', JSON.stringify(LIST));

});
