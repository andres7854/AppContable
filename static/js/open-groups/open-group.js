//IMPORTACION DE MODULOS DE NODE JS

const { ipcRenderer } = require('electron'); 
const { default: Swal } = require('sweetalert2');

//DECLARACION DE LOS BOTONES PARA CREACION DE OBJETOS (nominas, asientos contables, etc...)

const createPayRollBtn = document.getElementById('createPayRollBtn');

//INSERCION DE DATOS DEL GRUPO EN EL DOM

ipcRenderer.on('openGroup', (e, groupName) => {

    const windowTittle = document.getElementById('tittleOfWindowText');
    windowTittle.textContent = groupName;

    var openGroup = JSON.parse(localStorage.getItem(groupName));

    const windowDescription = document.getElementById('descriptionOfWindow');

    windowDescription.textContent = openGroup.groupDescription;

    renderObjects(openGroup)
    
})

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
                            localStorage.setItem(payRollName, JSON.stringify(newPayRoll));

                        }
                        

                    }

                })
                
            }
        }

    })

})

//FUNCION DE RENDERIZACION DE GRUPOS

const objectsContainer = document.querySelector('#objectsContainer');

const getAllLocalStorageKeys = () => {

    return Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)))

}

const renderOpenGroup = (objectToRender, openGroup) => {

    if (objectToRender.objectOfGroup === openGroup.groupName) {

        const objectTemplate = `
        
        <div class="col">
            
            <div class="card";">
                <div class="card-body">
                    
                    <h5 class="card-title">${openGroup.nameOfObject}</h5>
                    
                    <p class="card-text">${openGroup.descriptionOfObject}</p>
                    

                </div>
            </div>

        </div>

        <br>
        <br>

        `

        objectsContainer.innerHTML += objectTemplate;

    }

}

function renderObjects(openGroup) {
    
    return getAllLocalStorageKeys().map(renderOpenGroup, openGroup).join('');

}

renderObjects();

