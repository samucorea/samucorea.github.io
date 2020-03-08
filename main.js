var tareas = new Array;
var lista = document.getElementById("lista");
var counter = 0;

if(getCookie("tasks") != ""){
tareas = loadList("tasks");
for(var i =0; i < tareas.length; i++){
   creation(document.createTextNode(tareas[i]));
    
}

}

console.log(tareas);


document.addEventListener("keydown", event =>{
    if(event.keyCode == "13"){
        
        insertar();
    }
})


function insertar(){
    

    tareas.push(document.getElementById("new").value)
    var nuevatarea = document.createTextNode(document.getElementById("new").value);
    
    document.getElementById("new").value = "";
    
 

    creation(nuevatarea);
    arrayconvertida = JSON.stringify(tareas);
    createCookie("tasks", arrayconvertida, "30");
    console.log(getCookie("tasks"));
    
}

function creation(item){

    var idActual = counter.toString();

    var insertTool= document.createElement("li");
    insertTool.setAttribute("draggable", "true");
    insertTool.setAttribute("ondragstart","onDragStart(event)");
    insertTool.setAttribute("ondrop","onDrop(event)");
    insertTool.setAttribute("ondragover","onDragOver(event)");
    insertTool.setAttribute("id",idActual);
    
   
    insertTool.appendChild(item);

    var deleteTool = document.createElement("span");
    deleteTool.setAttribute("class", "simboloX");
    deleteTool.setAttribute("onclick","deleteElement(event)");


    var symbol = document.createTextNode("X");
    deleteTool.appendChild(symbol);
    insertTool.appendChild(deleteTool);


    lista.appendChild(insertTool);
    
   
    counter++;
}

function deleteElement(e){
   
    var elemento = e.target.parentNode;
    var x =elemento.childNodes[0].nodeValue;

    for(var i = 0;i < tareas.length;i++){
        if(tareas[i] == x){

                tareas.splice(tareas.indexOf(tareas[i]), 1);
                localStorage.setItem("listaguardada", JSON.stringify(tareas));
                break;
            }
    }
    lista.removeChild(elemento);
    arraycambiada = JSON.stringify(tareas);
    createCookie("tasks", arraycambiada, "30");
    
}

function loadList(data){
    var listacargada = getCookie(data);

    var tareascargada = JSON.parse(listacargada);

    return tareascargada;
    
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires;
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  function onDragStart(event){

    
      event
      .dataTransfer
      .setData("text", event.target.id);
      


  }

  function onDragOver(event){
      event.preventDefault();
    
  }

  function onDrop(event){
    
    if(event.target.tagName == "SPAN"){
        return;
    }

   
    const id= event
        .dataTransfer        
        .getData("text");

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    var aux = draggableElement.childNodes[0].nodeValue;
    draggableElement.childNodes[0].nodeValue = dropzone.childNodes[0].nodeValue;
    dropzone.childNodes[0].nodeValue = aux;
    

    event
    .dataTransfer
    .clearData();
    
  }

  function cancel(){
      return;
  }