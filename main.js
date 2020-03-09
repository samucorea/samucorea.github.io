var tareas = new Array;
var lista = document.getElementById("lista");
var counter = 0;

if(getCookie("tasks") != undefined){

    tareas = loadList("tasks");

for(var i =0; i < tareas.length; i++){

   creation(document.createTextNode(tareas[i]));
    
}

}




document.addEventListener("keypress", event =>{
  
     if (event.keyCode == "13"){
        
        insertar();
    }
})


function insertar(){
    
    if($("#new")[0].value == ""){
        return;
    }

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

    
    
    var newtaskgroup = document.createElement("span");

    newtaskgroup.appendChild(item);

    insertTool.appendChild(newtaskgroup);

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
    var x =elemento.firstChild.childNodes[0].nodeValue;
    console.log(elemento);
    console.log(x);

    for(var i = 0;i < tareas.length;i++){
        if(tareas[i] == x){

                tareas.splice(tareas.indexOf(tareas[i]), 1);

                break;
            }
    }
    lista.removeChild(elemento);
    console.log(tareas);
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
    event.preventDefault();
    if(event.target.className == "simboloX"){
        return;
    }

    
   
    const id= event
        .dataTransfer        
        .getData("text");
   

    const draggableElement = document.getElementById(id);
    console.log(draggableElement);
    const dropzone = event.target;
    
    console.log(event.target);
    var aux = draggableElement.childNodes[0].innerHTML;
    

    var dragElement = tareas.indexOf(aux);
    var dropElement = tareas.indexOf(dropzone.innerHTML);

    var auxarray = tareas[dragElement];

    tareas[dragElement] = tareas[dropElement];
    tareas[dropElement] = auxarray;


    draggableElement.childNodes[0].innerHTML = dropzone.innerHTML;
    dropzone.innerHTML = aux;
    
   
    var arraycambiada = JSON.stringify(tareas);
    createCookie("tasks", arraycambiada,"365");
    

    
    event
    .dataTransfer
    .clearData();
    
    
  }

  function cancel(){
      return;
  }



  var oriVal;
  $("#lista").on('dblclick', 'span', function () {
      oriVal = $(this).text();
      $(this).text("");
      $("<input type='text'>").appendTo(this).focus();
  });

  $("#lista").on('focusout', 'span > input', function () {
      var $this = $(this);
      
      $this.parent().text($this.val() || oriVal); 
      $this.remove();

      var indexChanged = tareas.indexOf(oriVal);
      tareas[indexChanged] = $this.val();

      console.log(tareas);
      createCookie("tasks", JSON.stringify(tareas));

  });

  $("#lista").keydown(function(e){
    if(e.which == "13"){
           
           $(':input').blur();
    }
});