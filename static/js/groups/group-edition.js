const { ipcRenderer } = require("electron")

ipcRenderer.on('editGroupWindow', (e, groupName) => {

    console.log('adawdaw')
    var body = document.querySelector('body');

    var groupToEdit = JSON.parse(localStorage.getItem(groupName))

    const formTemplate = `
    
        <div class="creationForm">

            <form id="accountCreationForm">
                    
                <h4>Editar el grupo '${groupName}'</h4>
                <br>
                <br>
                <h5>descripcion</h5>
                <input type="text" id="description" placeholder="descripcion del grupo" required="true" value="${groupToEdit.groupDescription}">
                <br>
                <br>
                <p class="card-text">contraseña del grupo</p>
                <input type="password" id="password" value="" required="true">
                <br>
                <br>
                <button type="submit" class="btn btn-dark" id="groupCreationFormSubmitBtn">Editar Grupo</button>

            </form>

        </div>
    
    `;

    body.innerHTML += formTemplate;

})