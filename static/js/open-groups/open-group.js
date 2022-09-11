//IMPORTACION DE MODULOS DE NODE JS

const { ipcRenderer } = require('electron'); 
const { default: Swal } = require('sweetalert2');

//DECLARACION DE VARIABLE DEL GRUPO ABIERTO Y CONTENEDOR DE LOS OBJETOS

let openGroup;

const objectsContainer = document.querySelector('#objectsContainer');

//DECLARACION DE LOS BOTONES PARA CREACION DE OBJETOS (nominas, asientos contables, etc...)

const createPayRollBtn = document.getElementById('createPayRollBtn');

//INSERCION DE DATOS DEL GRUPO EN EL DOM Y DECLARACION DEL GRUPO ABIERTO

ipcRenderer.on('openGroup', async (e, groupName) => {

    const windowTittle = document.getElementById('tittleOfWindowText');
    windowTittle.textContent = groupName;

    openGroup = JSON.parse(localStorage.getItem(groupName));

    const windowDescription = document.getElementById('descriptionOfWindow');
    windowDescription.textContent = openGroup.groupDescription;

    renderObjects();
  
})

//FUNCION PARA LIMPIAR EL DOOM PARA NUEVAS RENDERIZACIONES

function clearDOM() {
    
    objectsContainer.innerHTML = ''; 

}

//FUNCION PARA DETECTAR UN NUEVO ESTADO EN LOS OBJETOS

function detectObjectsStatus(objectsStatus) {
    
    if (objectsStatus == 'objectCreated') {
        
        Swal.fire({

            title: 'Objecto creado correctamente',
            icon: 'success',
            confirmButtonText: "ok",
            allowEscapeKey: "false",
            stopKeydownPropagation: "true",
    
        })

    }else if (objectsStatus == 'objectEdited') {
        
        Swal.fire({

            title: 'Objecto editado correctamente',
            icon: 'success',
            confirmButtonText: "ok",
            allowEscapeKey: "false",
            stopKeydownPropagation: "true",
    
        })

    }else if(objectsStatus == 'objectDeleted') {

        Swal.fire({

            title: 'Objecto eliminado correctamente',
            icon: 'success',
            confirmButtonText: "ok",
            allowEscapeKey: "false",
            stopKeydownPropagation: "true",
    
        })

    }

}

//FUNCION DE CREACION DE NOMINA

createPayRollBtn.addEventListener('click', (e)=> {

    Swal.fire({

        title: 'Nueva nomina',
        text: 'elija el nombre de la nueva nomina',
        icon: 'info',
        input: 'text',
        inputPlaceholder: "nombre de la nomina",
        confirmButtonText: "siguiente",
        showCancelButton: "true",
        cancelButtonText: "cancelar",
        cancelButtonColor: "red",
        allowEscapeKey: "false",
        stopKeydownPropagation: "true",
        inputValidator: payRollName => {
            
            let newPayRoll = {}

            if (!payRollName) {
                return "Por favor escribe el nombre de la nomina";
            } else {

                newPayRoll.objectOfGroup = openGroup.groupName;

                newPayRoll.type = 'payRoll';

                newPayRoll.nameOfObject = payRollName;

                //establecimiento de variables para comprobar cuando se acaban de recorrer todos los objesto en el local storage
                                
                let keys = Object.keys(localStorage);
                            
                let currentKeyPosition = -1;                
                
                //recorrido a traves de todos los objetos en el local storage
                
                for (i=0; i <= keys.length; i++) {                                  
                
                    //establecimiento de la pocion actual durante el recorrido
                
                    currentKeyPosition = currentKeyPosition+1;
                
                    var keysLength = keys.length;
                        
                    var key = keys[i];
                
                    //condicional en caso de ya estar usado el nombre de grupo elegido
                    if (key == newPayRoll.nameOfObject) {
                          
                        return('este nombre ya ah sido usado recuerda que no puedes usar los mismos nombres de grupos, nominas, asientos contables, etc.. para otros usos')
                
                    }else if(currentKeyPosition == keysLength){                        
                
                        Swal.fire({

                            title: 'Nueva nomina',
                            text: 'elija la descripcion de la nueva nomina',
                            icon: 'info',
                            input: 'text',
                            inputPlaceholder: "descripcion de la nomina",
                            confirmButtonText: "crear nomina",
                            showCancelButton: "true",
                            cancelButtonText: "cancelar",
                            cancelButtonColor: "red",
                            allowEscapeKey: "false",
                            stopKeydownPropagation: "true",
                            inputValidator: payRollDescription => {
        
                                if (!payRollDescription) {
                                    return "Por favor escribe la descripcion de la nomina";
                                }else{
        
                                    newPayRoll.descriptionOfObject = payRollDescription;
                                    newPayRoll.name = '';
                                    newPayRoll.minimunWage = '0';
                                    newPayRoll.days = '0';
                                    newPayRoll.extraHours = '0';
                                    newPayRoll.commissions = '0';
                                    newPayRoll.lendLease = '0';   
                                    newPayRoll.amountDays = '0';
                                    newPayRoll.amountTransAss = '0';
                                    newPayRoll.amountEpsCon = '0';
                                    newPayRoll.amountPenCon  = '0';                                    
                                    localStorage.setItem(payRollName, JSON.stringify(newPayRoll));
                                    clearDOM();
                                    renderObjects();

                                    var objectsStatus = 'objectCreated';
                                    detectObjectsStatus(objectsStatus);
        
                                }
                            
                            }
        
                        })

                    }
                    
                }                
                
            }
        }

    })

})

//FUNCION PARA ABRIR OBJETOS

function openObject(objectSelectedName, objectType) {
    
    var objectSelected = JSON.parse(localStorage.getItem(objectSelectedName));

    var groupOfObjectSelected = JSON.parse(localStorage.getItem(objectSelected.objectOfGroup));

    Swal.fire({

        title: `Abrir ${objectType}`,
        icon: 'warning',
        input: 'text',
        inputValue: ``,
        inputPlaceholder: "contraseña",
        confirmButtonText: "Abrir",
        showCancelButton: "true",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
        allowEscapeKey: "false",
        stopKeydownPropagation: "true",
        inputValidator: objectPassword => {

            if (!objectPassword) {

                return 'por favor escribe la contraseña';

            }else if (objectPassword == groupOfObjectSelected.groupPassword) {
                
                if (objectSelected.type == 'payRoll') {
                
                    ipcRenderer.send('openPayroll', objectSelected);

                }
                

            }else{

                return 'Contraseña incorrecta recuerde que la contraseña es la misma escogida anteriormente para el grupo';

            }

        }

    })

}

//FUNCION PARA EDITAR OBJETOS

function editObject(objectSelectedName, objectType) {
    
    var objectSelected = JSON.parse(localStorage.getItem(objectSelectedName));

    Swal.fire({

        title: `Editar ${objectType}`,
        text: `editar la descripcion de ${objectSelected.nameOfObject}`,
        icon: 'warning',
        input: 'text',
        inputValue: `${objectSelected.descriptionOfObject}`,
        inputPlaceholder: "descripcion",
        confirmButtonText: "Siguiente",
        showCancelButton: "true",
        cancelButtonText: "cancelar",
        cancelButtonColor: "red",
        allowEscapeKey: "false",
        stopKeydownPropagation: "true",
        inputValidator: objectDescription => {
            
            let objectToEdit = {}

            if (!objectDescription) {
                return "Por favor escribe una descripcion";
            } else {

                var groupOfObjectSelected = JSON.parse(localStorage.getItem(objectSelected.objectOfGroup))

                Swal.fire({

                    title: `Editar ${objectType}`,
                    text: `contraseña de ${objectSelected.nameOfObject}`,
                    icon: 'warning',
                    input: 'text',
                    inputPlaceholder: `contraseña de ${objectType}`,
                    confirmButtonText: "Editar",
                    showCancelButton: "true",
                    cancelButtonText: "cancelar",
                    cancelButtonColor: "red",
                    allowEscapeKey: "false",
                    stopKeydownPropagation: "true",
                    inputValidator: objectPassword => {  
                        
                        if (!objectPassword) {
                            
                            return 'Por favor escribe la contraseña';

                        }else if (objectPassword == groupOfObjectSelected.groupPassword) {

                            objectToEdit.objectOfGroup = openGroup.groupName;

                            objectToEdit.type = objectSelected.type;

                            objectToEdit.nameOfObject = objectSelected.nameOfObject;
                            
                            objectToEdit.descriptionOfObject = objectDescription;

                            localStorage.setItem(objectSelected.nameOfObject, JSON.stringify(objectToEdit));
                            clearDOM();
                            renderObjects();

                            var objectsStatus = 'objectEdited';
                            detectObjectsStatus(objectsStatus);

                        }else{

                            return 'Contraseña incorrecta recuerde que la contraseña es la misma escogida anteriormente para el grupo';

                        }

                    }
                
                })
                
            }
        }

    })

}

//FUNCION PARA BORRAR OBJETOS

function deleteObject(objectSelectedName, objectType){

    var objectSelected = JSON.parse(localStorage.getItem(objectSelectedName))

    var groupOfObjectSelected = JSON.parse(localStorage.getItem(objectSelected.objectOfGroup))

    Swal.fire({

        title: `Editar ${objectType}`,
        text: `contraseña de ${objectSelected.nameOfObject}`,
        icon: 'warning',
        input: 'text',
        inputPlaceholder: `contraseña de ${objectType}`,
        confirmButtonText: "Eliminar",
        showCancelButton: "true",
        cancelButtonText: "cancelar",
        cancelButtonColor: "red",
        allowEscapeKey: "false",
        stopKeydownPropagation: "true",
        inputValidator: objectPassword => {

            if (!objectPassword){

                return 'por favor escribe la contraseña';

            }
            else if(objectPassword == groupOfObjectSelected.groupPassword) {

                localStorage.removeItem(objectSelectedName);
                clearDOM();
                renderObjects();

                var objectsStatus = 'objectDeleted';
                detectObjectsStatus(objectsStatus);

            }else{

                return 'Contraseña incorrecta recuerde que la contraseña es la misma escogida anteriormente para el grupo';

            }

        }

    })

}

//FUNCION DE RENDERIZACION DE OBJETOS

function getAllLocalStorageKeys(){

    return Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)))

}

function renderOpenGroup(objectToRender){

    if (objectToRender.objectOfGroup === openGroup.groupName) {

        var objectTemplate;

        if (objectToRender.type == "payRoll") {

            objectTemplate = `
        
            <div class="col">
                    
                <div class="card">

                    <div class="card-body text-center">
                        
                        <h3 class="card-title">Nomina</h3>

                        <h5 class="card-title">${objectToRender.nameOfObject}</h5>
                        
                        <p class="card-text">${objectToRender.descriptionOfObject}</p>

                        <button type="button" class="btn btn-danger" onclick="editObject(objectSelectedName = '${objectToRender.nameOfObject}', objectType = 'nomina')" id="editBtn">Editar</button>
                        <button type="button" class="btn btn-success" onclick="openObject(objectSelectedName = '${objectToRender.nameOfObject}', objectType = 'nomina')" id="openBtn">Abrir</button>
                        <button type="button" class="btn btn-danger" onclick="deleteObject(objectSelectedName = '${objectToRender.nameOfObject}', objectType = 'nomina')" id="deleteBtn">Borrar</button>

                    </div>

                </div>

            </div>

                <br>
                <br>

            `

        }

        objectsContainer.innerHTML += objectTemplate;

    }

}

function renderObjects() {
    
    return getAllLocalStorageKeys().map(renderOpenGroup).join('');

}

