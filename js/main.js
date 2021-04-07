
//selectors
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter_todo');
//event listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)


function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    const clss = localStorage.getItem('cls');
    // if reference exists
    if (reference || clss) {
      // converts back to array and store it in todos array
      todos = JSON.parse(reference);
      cls = JSON.parse(clss);
      console.log(todos);
      console.log(cls);
      var c = clss.slice(12, 16);
      console.log(c);


for(let i = 1; i<todos.length; i++ ){

      const todoDiv = document.createElement('div');
      todoDiv.classList.add(c);
      //todo LI 
      const newTodo = document.createElement('li');
      newTodo.innerText = todos[i];
      newTodo.classList.add('todo_item');
      newTodo.classList.toggle('draggable');
      newTodo.setAttribute("draggable","true");
      todoDiv.appendChild(newTodo);
   
      //check mark BUTTON
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete_btn')
      todoDiv.appendChild(completedButton);
      //delete BUTTON
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.classList.add('delete_btn')
      todoDiv.appendChild(deleteButton);
      //Append to Actual LIST
      todoList.appendChild(todoDiv);

      var arrayVal = Object.entries(cls[i]).map(item => item[1]);
      for ( x in arrayVal) {
         if(arrayVal[1]) 
         {
          console.log(arrayVal[1]);
          var ele = todoList.children[i-1];
          ele.classList.toggle("completedItem");
          break;
         }
      }
    
      addEventsDragAndDrop(newTodo);

}

    }



    }
 getFromLocalStorage();



function addTodo(event) {
  
    event.preventDefault();
    //todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //todo LI 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo_item');
    newTodo.classList.toggle('dragable');
    todoDiv.appendChild(newTodo);
    if(todoInput.value === ""){
        return null
    }
    //check mark BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_btn')
    todoDiv.appendChild(completedButton);
    //delete BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete_btn')
    todoDiv.appendChild(deleteButton);
    //Append to Actual LIST
    todoList.appendChild(todoDiv);
    //Clear todo input VALUE
    todoInput.value = "";
    addEventsDragAndDrop(newTodo);
    
}


//DELETE & CHECK
function deleteCheck(e) {
    const item = e.target;
    //DELETE ITEM
    if (item.classList[0] === "delete_btn") {
        const todo = item.parentElement;
        //ANIMATION TRANSITION
        todo.classList.add("fall")
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
        
    }
    //COMPLETE ITEM
    if (item.classList[0] === "complete_btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completedItem")
        
    }
    
}
//FILTERING THE TASKS ACCORDING THE OPTION
function filterTodo(e) {
    const todos = todoList.childNodes;
    
    for(let i = 1; i<todos.length; i++ ){
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
        }
    }
} 

setInterval(function save() {
    const todos = todoList.childNodes;
    var val = [];
    var cls = [];
     for(let i = 1; i<todos.length; i++ ){
         val[i]= todos[i].firstChild.innerHTML;
         cls[i]= todos[i].classList;
    }
    window.localStorage.setItem("todos",JSON.stringify(val));
    window.localStorage.setItem("cls",JSON.stringify(cls));
},100);









function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  };
  
  function dragEnter(e) {
    this.classList.add('over');
  }
  
  function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
  }
  
  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }
  
  function dragDrop(e) {
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }
  
  function dragEnd(e) {
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
      item.classList.remove('over');
    });
    this.style.opacity = '1';
  }
  
  function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
  }

