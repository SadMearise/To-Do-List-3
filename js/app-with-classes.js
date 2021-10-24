class List {
    constructor(trash, item) {
        this.trash = trash;
        this.item = item;
    };

    addToDo() {
        if (this.trash){ return; }
        const position = 'beforeend';
        list.insertAdjacentHTML(position, this.item);
    }
}

class Task {
    constructor() {
        this.CHECK = "fa-check-circle";
        this.UNCHECK = "fa-circle-thin";
        this.LINE_THROUGH = "lineThrough";
    }

    createTask(toDo, id, done) {
        const DONE = done ? this.CHECK : this.UNCHECK;
        const LINE = done ? this.LINE_THROUGH : "";
        const item = `
        <li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}"">${toDo}</p>
            <i class="fa fa-trash-o de" job="remove" id="${id}"></i>
        </li>
        `;
        return item;
    }

    removeToDo(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);
        
        LIST[element.id].trash = true;
    }

    completeToDo(element) {
        element.classList.toggle(this.CHECK);
        element.classList.toggle(this.UNCHECK);
        element.parentNode.querySelector('.text').classList.toggle(this.LINE_THROUGH);
        
        LIST[element.id].done = !LIST[element.id].done;
    }
}


const input = document.getElementById('input')
const list = document.getElementById('list')
const elementDate = document.getElementById('date')
const clear = document.querySelector(".clear")

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
        const task = new Task().createTask(item.name, item.id, item.done);
        const list = new List(item.trash, task);

        list.addToDo();
        
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
            const task = new Task().createTask(toDo, id, false);
            const list = new List(false, task);

            list.addToDo();

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


clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
})


list.addEventListener('click', function(event) {
    const element = event.target; 
    const elementJob = element.attributes.job.value;

    const task = new Task();

    if (elementJob == 'complete') {
        task.completeToDo(element);
    } else if (elementJob == 'remove') {
        task.removeToDo(element);
    }

    localStorage.setItem('TODO', JSON.stringify(LIST));

});
