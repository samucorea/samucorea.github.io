var tareas = new Array;
var lista = document.getElementById("lista");
var counterActual;
var checkBoxes= new Array;



if(getCookie("tasks") != undefined){

    tareas = loadList("tasks");

for(var i =0; i < tareas.length; i++){

   creation(document.createTextNode(tareas[i]),i.toString(),i);
    
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

function creation(item, id,checkBoxStatus){

    

    
    //Fila que incluye todo
    var insertTool= document.createElement("li");
    insertTool.setAttribute("draggable", "true");
    insertTool.setAttribute("ondragstart","onDragStart(event)");
    insertTool.setAttribute("ondrop","onDrop(event)");
    insertTool.setAttribute("ondragover","onDragOver(event)");
    insertTool.setAttribute("id",id);


    //To Do texto
    var textContent = document.createElement("span");
    textContent.setAttribute("class","textContent");
    textContent.appendChild(item);

    insertTool.appendChild(textContent);
    //Herramienta para eliminar "X"
    var deleteTool = document.createElement("span");
    deleteTool.setAttribute("class", "simboloX");
    deleteTool.setAttribute("onclick","deleteElement(event)");
    var symbol = document.createTextNode("X");
    deleteTool.appendChild(symbol);

    /*Herramienta para cambiar de color
    
    for(var i = 0; i < 3;i++){
        colorTools[i] = document.createElement("span");
        colorTools[i].setAttribute("class","colorChanger");
        insertTool.appendChild(colorTools[i]);
    }
    */
   //Checkbox
   checkBoxStatus = getCookie(`check${checkBoxStatus}`);

    
    var checkTool = $(`<input type='checkbox' class='check form-check-input' id='check${id}' onclick='checkBox(event)'>`);

    if(checkBoxStatus == "0"){
        $(checkTool).prop("checked", true);
        insertTool.style.backgroundColor = "red";
    }
    else{
        $(checkTool).prop("checked", false);
        insertTool.style.backgroundColor = "lightblue";
    }
    
    $(insertTool).append(checkTool);
    insertTool.appendChild(deleteTool);


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
    createCookie(`${elemento.childNodes[1].id}`, "1", "365");
    
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
    
    $(':focus').blur();
    
      event
      .dataTransfer
      .setData("text", event.target.id);
      


  }

  function onDragOver(event){
      if(event.target.nodeName == "INPUT"){
          return;
      }
      event.preventDefault();
      
      
    
  }

  


  
 // $('#lista').on

  function onDrop(event){
    event.preventDefault();

    const id= event
    .dataTransfer        
    .getData("text");

    const draggableElement = document.getElementById(id);
    
    if(event.target.className == "simboloX" || event.target.parentNode.nodeName=="UL" || event.target.nodeName ==="INPUT" || draggableElement == null){
        return;
    }
    
    
   
    const dropzone = event.target.parentNode;
    
    var aux = draggableElement.childNodes[0].innerHTML;
    var auxBG = draggableElement.style.backgroundColor;
   

    var dragElement = tareas.indexOf(aux);
    var dropElement = tareas.indexOf(dropzone.childNodes[0].innerHTML);



    var auxarray = tareas[dragElement];

    tareas[dragElement] = tareas[dropElement];
    tareas[dropElement] = auxarray;

    var dragElementcheckstatus = draggableElement.childNodes[1].checked;
    var dropzonecheckstatus = dropzone.childNodes[1].checked;

    var dragElementCheckId = draggableElement.childNodes[1].id;
    var dropzoneElementCheckId = dropzone.childNodes[1].id;


    draggableElement.childNodes[0].innerHTML = dropzone.childNodes[0].innerHTML;
    dropzone.childNodes[0].innerHTML = aux;
   
    draggableElement.style.backgroundColor = dropzone.style.backgroundColor;  
    dropzone.style.backgroundColor = auxBG;

    draggableElement.childNodes[1].checked = dropzonecheckstatus;
    dropzone.childNodes[1].checked = dragElementcheckstatus;

    

    
    createCookie(`${draggableElement.childNodes[1].id}`,convertToIntBool(dropzonecheckstatus),"365");
    createCookie(`${dropzone.childNodes[1].id}`,convertToIntBool(dragElementcheckstatus),"365");

    
   
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
      var inputEdit =  $(`<input type='text' class='edit' value ="">`);
      inputEdit.val(oriVal);
      inputEdit.appendTo(this).focus();
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

function checkBox(event){
    checkbox = document.getElementById(event.target.id);
    if(checkbox.checked == true){
        event.target.parentNode.style.backgroundColor = "red";
        createCookie(`${event.target.id}`, "0","365");
    }
    else{
        event.target.parentNode.style.backgroundColor = "lightblue";
        createCookie(`${event.target.id}`, "1","365");
    }
 
   
}
function convertToIntBool(bool){
    if(bool == true){
        return "0";
    }
    else if(bool == false){
        return "1";
    }
}