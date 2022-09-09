const { ipcRenderer } = require('electron');
const createGroupBtn = document.getElementById('createGroupBtn');
const deleteGroupBtn = document.getElementById('deleteGroupBtn');


//INICIO DE EVENTO CREACION DE GRUPOS

createGroupBtn.addEventListener('click', (e) => {

    ipcRenderer.send('groupCreationWindow');

})

//INICIO DE EVENTO ELEMINACION DE GRUPOS


deleteGroupBtn.addEventListener('click', (e) => {

    ipcRenderer.send('groupDeletionWindow');

})


//ENVIO DE GRUPOS AL LOCAL STORAGE

const saveNewGroup = (newGroup) => {

    localStorage.setItem(newGroup.groupName, JSON.stringify(newGroup))

}

//EDICION DE GRUPO YA EN EL LOCAL STORAGE

const EditAGroup = (newGroupEdited) => {

    console.log(newGroupEdited)
    localStorage.setItem(newGroupEdited.groupName, JSON.stringify(newGroupEdited))

}

//OBTENCION DE LOS GRUPOS CREADOS EN EL LOCAL STORAGE



const getGroups = () => {

    return Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)))

}


//RENDERIZACION DE GRUPOS EN EL DOM


//obtencion de variables para renderizar los grupos

var containerToWrite = document.getElementById('3');
var currentNumberOfGroup = 0;
var maxNumberOfRows = 3;

//funcion para eliminacion de los elementos ya creados en el DOM

function clearDOM() {

    //declaracion y eliminacion de los grupos ya creados para su nueva renderizacion
    const body = document.getElementById('bodyToModify');

    body.innerHTML = '';

    //deteccion del contenedor principal

    var container = document.querySelector('.container');

    container.innerHTML = '';
    

    //redeclaracion de variables a su estado inicial para la correcta renderizacion de los grupos

    containerToWrite = document.getElementById('3');
    currentNumberOfGroup = 0;
    maxNumberOfRows = 3; 

}

//funcion de renderizacion en el DOM

function createGroupElement(group) {

    var type = group.type;

    if (type === 'group'){

        var groups = document.querySelectorAll(".card")

        var numberOfGroups = groups.length;


        //condicional que determina el numero de columnas

        if (numberOfGroups < maxNumberOfRows) {

            currentNumberOfGroup = currentNumberOfGroup + 1;

            const newGroupTemplate = `

            
                <div class="row-xs-4 p-2">
                        
                    <div class="card" style="width: 25vw;">
                        <div class="card-body">
                            
                            <h5 class="card-title">${group.groupName}</h5>
                            
                            <p class="card-text">${group.groupDescription}</p>
                            
                            <button type="button" class="btn btn-success" onclick="openGroup(groupNameToOpen = '${group.groupName}')">Abrir</button>
                            <button type="button" class="btn btn-success" onclick="editGroup(groupNameToEdit = '${group.groupName}')">Editar</button>

                        </div>
                    </div>

                </div>
            

            `;

            //console.log(currentNumberOfGroup)


            //condicional para la obtencion del div en el que se insertara el nuevo grupo

            if ((currentNumberOfGroup % 3) == 0) {

                containerToWrite = document.getElementById(`${currentNumberOfGroup}`);
                //console.log('soy multiplo de 3')

            } else {

                //console.log('no soy multiplo de 3')

            }


            //renderizacion del nuevo grupo en el DOM

            containerToWrite.innerHTML += newGroupTemplate;

        } else {


            //insercion de un nuevo contenedor en caso de llegar al maximo de filas 

            currentNumberOfGroup = currentNumberOfGroup + 1;

            maxNumberOfRows = maxNumberOfRows + 3;

            var maxNumberOfRowsId = maxNumberOfRows.toString();

            const body = document.getElementById('bodyToModify');

            const newDivTemplate = `
        
                <div class="container px-4" id="${maxNumberOfRowsId}">
                    


                </div>

            `;  

            //renderizacion del nuevo contenedor

            body.innerHTML += newDivTemplate;


            //insercion del nuevo grupo en el contenedor creado

            const newGroupTemplate = `

                <div class="row-xs-4 p-2">

                    <div class="card" style="width: 25vw;">
                        <div class="card-body">

                            <h5 class="card-title">${group.groupName}</h5>
                            
                            <p class="card-text">${group.groupDescription}</p>
                            
                            <button type="button" class="btn btn-success" onclick="openGroup(groupNameToOpen = '${group.groupName}')>Abrir</button>
                            <button type="button" class="btn btn-success" onclick="editGroup(groupNameToEdit = '${group.groupName}')">Editar</button>

                        </div>
                    </div>

                </div>

            `;


            //renderizacion del nuevo grupo creado

            containerToWrite = document.getElementById(`${maxNumberOfRowsId}`);

            containerToWrite.innerHTML += newGroupTemplate


        }


        //RESTABLECIMIENTO DE VARIABLES PARA PODER VOLVER A RENDERIZAR

        var keys = Object.keys(localStorage);
        var keysLength = keys.length;

        if (numberOfGroups == keysLength) {

            containerToWrite = document.getElementById('3');
            currentNumberOfGroup = 0;

        }

    }

}

//FUNCION DE CREACION DE VENTANA DE GRUPOS

function openGroup(groupNameToOpen) {

    var groupName = groupNameToOpen;
    
    ipcRenderer.send('openGroupWindow', groupName);

}

//FUNCION DE CREACION DE VENTANA DE EDICION DE GRUPOS

function editGroup(groupNameToEdit) {

    var groupName = groupNameToEdit;
    
    ipcRenderer.send('editGroupWindow', groupName);

}


//FUNCION ENCARGADA DE EJECUTAR TODO EL CODIGO DE RENDERIZACION DE GRUPOS

function renderGroups() {
    
    return getGroups().map(createGroupElement).join('');

}

//DETECCION DE EVENTOS CREAR NUEVO GRUPO

ipcRenderer.on('newGroupEvent', (e, newGroup) => {


    //establecimiento de variables para comprobar cuando se acaban de recorrer todos los grupos en el local storage
    
    
    let keys = Object.keys(localStorage);

    let currentKeyPosition = -1;


    //recorrido a traves de todos los grupos en el local storage

    for (i=0; i <= keys.length; i++) {
      

        //establecimiento de la pocion actual durante el recorrido

        currentKeyPosition = currentKeyPosition+1;

        var keysLength = keys.length;
        
        var key = keys[i];

        //condicional en caso de ya estar usado el nombre de grupo elegido
        if (key == newGroup.groupName) {
          
            alert('este nombre ya ah sido usado por algo mas')
            break

        }else if(currentKeyPosition == keysLength){
            
            //insercion del nuevo grupo al local storage mediante la funciona ya creada
            saveNewGroup(newGroup);

            //eliminacion de los grupos ya renderizados en el DOM
            clearDOM();

            //renderezacion de los grupos
            renderGroups();

        }
    }

}) 

//DETECCION DE EVENTOS EDITAR UN GRUPO

ipcRenderer.on('editGroupEvent', (e, newGroupEdited) => {
      
    //edicion e insercion del grupo al local storage mediante la funciona ya creada
    EditAGroup(newGroupEdited);

    //eliminacion de los grupos ya renderizados en el DOM
    clearDOM();

    //renderezacion de los grupos
    renderGroups();

}) 

//DETECCION DE EVENTOS BORRAR GRUPO

ipcRenderer.on('groupDeletion', (e) => {

    //eliminacion de los grupos ya renderizados en el DOM
    clearDOM();

    //renderizacion de los grupos

    renderGroups();

});

//RENDERIZACION DE LOS GRUPOS YA CREADOS AL INICIAR LA APLICACION

renderGroups();