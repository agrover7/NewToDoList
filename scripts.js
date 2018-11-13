var unique_key = "80dcc13e2aed041d334bbe2410a977eeb28581b2fd73fa42bd5fef86601318c2"

//To load Todos that already exist
var listRequest = new XMLHttpRequest();
listRequest.onreadystatechange = function(){
  if(this.readyState ==4 && this.status == 200)
  {
    var todos = JSON.parse(this.responseText);
    for(var i = 0; i < todos.length; i++)
    {
        renderTodo(todos[i]);
    }
  }
  else if(this.readyState == 4)
  {
    console.log(this.responseText);
  }
}

listRequest.open("GET", "https://api.kraigh.net/todos", true);
listRequest.setRequestHeader("x-api-key", unique_key);
listRequest.send()

//Display these pulled values into the page


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
    if(todoData.completed == true)
    {
      todo.classList.add("completed");
    }

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

    document.getElementById("todo_collection").appendChild(todo);
    completeButton.addEventListener("click", completeTodo);
    deleteButton.addEventListener("click", deleteTodo);

    document.getElementById("newTitle").value = "";
}

function completeTodo(event){
    var todoId = event.target.parentNode.id; //event is passed to this function. target is element event is triggered for (the button). The parentNode grabs the entire article (rather than only the button). Then, we access the id.
    var data = {
      completed: true
    };
    var completeRequest = new XMLHttpRequest();
    completeRequest.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200)
    {
      event.target.parentNode.classList.add("completed") //selects todo.completed
    }
    else if(this.readyState == 4)
    {
      console.log(this.response);
    }
}
    completeRequest.open("PUT", "https://api.kraigh.net/todos/" + todoId, true);
    completeRequest.setRequestHeader("Content-type", "application/json");
    completeRequest.setRequestHeader("x-api-key", unique_key);
    completeRequest.send(JSON.stringify(data));
}

function deleteTodo(event){
  var todoId = event.target.parentNode.id; //event is passed to this function. target is element event is triggered for (the button). The parentNode grabs the entire article (rather than only the button). Then, we access the id.
  var deleteRequest = new XMLHttpRequest();
  deleteRequest.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200)
  {
      event.target.parentNode.remove();
  }
  else if(this.readyState == 4)
  {
    console.log(this.response);
  }
}
  deleteRequest.open("DELETE", "https://api.kraigh.net/todos/" + todoId, true);
  deleteRequest.setRequestHeader("Content-type", "application/json");
  deleteRequest.setRequestHeader("x-api-key", unique_key);
  deleteRequest.send();
}
