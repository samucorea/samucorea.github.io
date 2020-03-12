var tareas = new Array;
var lista = document.getElementById("lista");
var counterActual;





if(getCookie("tasks") != undefined){

    tareas = loadList("tasks");

for(var i =0; i < tareas.length; i++){

   creation(document.createTextNode(tareas[i]),i.toString());
    
}

}
counterActual = tareas.length;





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
    
 

    creation(nuevatarea, counterActual.toString());
    arrayconvertida = JSON.stringify(tareas);
    createCookie("tasks", arrayconvertida, "30");
   
    
    counterActual++;
}

function creation(item, id){

    

    

    var insertTool= document.createElement("li");
    insertTool.setAttribute("draggable", "true");
    insertTool.setAttribute("ondragstart","onDragStart(event)");
    insertTool.setAttribute("ondrop","onDrop(event)");
    insertTool.setAttribute("ondragover","onDragOver(event)");
    insertTool.setAttribute("id",id);

   

    


    var textContent = document.createElement("span");
    textContent.setAttribute("class","textContent");
    textContent.appendChild(item);

    insertTool.appendChild(textContent);

    var deleteTool = document.createElement("span");
    deleteTool.setAttribute("class", "simboloX");
    deleteTool.setAttribute("onclick","deleteElement(event)");


    var symbol = document.createTextNode("X");
    deleteTool.appendChild(symbol);
    
    insertTool.appendChild(deleteTool);
    //insertTool.appendChild(deleteTool);


    lista.appendChild(insertTool);
    
  
    
}

function deleteElement(e){
   
    var elemento = e.target.parentNode;
    var x =elemento.childNodes[0].innerHTML;

   

    for(var i = 0;i < tareas.length;i++){
        if(tareas[i] == x.toString()){

                tareas.splice(tareas.indexOf(tareas[i]), 1);

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

  $('#lista').on('dragover','li', function (){
       
  })
  $('#lista').on('dragleave','li', function (){
    
})
$('#lista').on('drop','li', function (){
   
})


  
 // $('#lista').on

  function onDrop(event){
    event.preventDefault();
    console.log(event.target.id);
    if(event.target.className == "simboloX" || event.target.parentNode.nodeName=="UL"){
        return;
    }
    
   

    
   
    const id= event
        .dataTransfer        
        .getData("text");
   

    const draggableElement = document.getElementById(id);
   
    const dropzone = event.target.parentNode;
    
    var aux = draggableElement.childNodes[0].innerHTML;
    
    

    var dragElement = tareas.indexOf(aux);
    var dropElement = tareas.indexOf(dropzone.childNodes[0].innerHTML);

    console.log(dropzone);

    var auxarray = tareas[dragElement];

    tareas[dragElement] = tareas[dropElement];
    tareas[dropElement] = auxarray;

   
    draggableElement.childNodes[0].innerHTML = dropzone.childNodes[0].innerHTML;
    dropzone.childNodes[0].innerHTML = aux;
    
   
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
      
      console.log(oriVal);
      $(this).text("");
      $("<input type='text' class='edit'>").appendTo(this).focus();
  });

  $("#lista").on('focusout', 'span > input', function () {
      var $this = $(this);
      
      $this.parent().text($this.val() || oriVal); 
      $this.remove();

      var indexChanged = tareas.indexOf(oriVal);
      
      if($this.val() == ""){
          tareas[indexChanged] = oriVal;
      }
      else{
        tareas[indexChanged] = $this.val();
      }
      

     
      createCookie("tasks", JSON.stringify(tareas),"365");

  });

  $("#lista").keydown(function(e){
    if(e.which == "13"){
           
           $(':focus').blur();
    }
});