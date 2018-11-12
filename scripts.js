var unique_key = "80dcc13e2aed041d334bbe2410a977eeb28581b2fd73fa42bd5fef86601318c2"


//To add new events
document.getElementById("new-todo-form").addEventListener("submit", function(event) {
      event.preventDefault();

      var data = {
        text: newTitle.value
      }

      var createRequest = new XMLHttpRequest();
      createRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          renderTodo(JSON.parse(this.responseText));
        }

        else if (this.readyState == 4) {
          console.log(this.responseText);
        }
      };

      createRequest.open("POST", "https://api.kraigh.net/todos");
      createRequest.setRequestHeader("Content-type", "application/json");
      createRequest.setRequestHeader("x-api-key", unique_key);
      createRequest.send(JSON.stringify(data));
});

function renderTodo(todoData)
{
    var todo = document.createElement("article");
    todo.setAttribute("id", todoData.id);
    todo.classList.add("todo");

    var completeButton = document.createElement("button");
    completeButton.classList.add("check");
    todo.appendChild(completeButton);

    var todoText = document.createElement("p");
    todoText.innerText = todoData.text;
    todo.appendChild(todoText);

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "-";
    todo.appendChild(deleteButton);

    document.getElementById("todos").appendChild(todo);
    completeButton.addEventListener("click", completeTodo);
    deleteButton.addEventListener("click", deleteTodo);
    
    document.getElementById("newTitle").value = "";
}

function completeTodo(event){
  console.log(event);
}

function deleteTodo(event){
  console.log(event);
}
