const { ipcRenderer } = require("electron")

ipcRenderer.on('editGroupWindow', (e, groupName) => {

    console.log('adawdaw')
    var body = document.querySelector('body');

    var groupToEdit = JSON.parse(localStorage.getItem(groupName))

    const formTemplate = `
    
        <div class="creationForm">

            <form id="accountCreationForm">
                    
                <h4 id="groupName">Editar el grupo '${groupName}'</h4>
                <br>
                <br>
                <h5>descripcion</h5>
                <textarea id="description" cols="30">${groupToEdit.groupDescription}</textarea>
                <br>
                <br>                
                <input type="password" id="password" value="" required="true" placeholder="contraseña">
                <br>
                <br>
                <input type="password" id="passwordConfirmation" value="" required="true" placeholder="confirme la contraseña">
                <br>
                <br>
                <button type="submit" class="btn btn-dark" id="groupEditionFormSubmitBtn" onclick="editGroupEvent()">Editar Grupo</button>

            </form>

        </div>
    
    `;

    body.innerHTML += formTemplate;

})

function reloadTextArea() {
    
    textArea = document.getElementById('description');

    textArea.style.height = `${textArea.scrollHeight}px`

}

function editGroupEvent() {
    
    var groupName = document.getElementById('groupName').textContent;
    var groupDescription = document.getElementById('description');
    var groupPassword = document.getElementById('password');

    const groupToEdit = JSON.parse(localStorage.getItem(groupName))
    const realPassword = groupToEdit.groupPassword
    if (groupPassword === realPassword) {
        
        const groupToEdit = {

            groupName,
            groupDescription,
            groupPassword

        }
        localStorage.setItem(groupToEdit.groupName, JSON.stringify(groupToEdit))
        ipcRenderer.send('editGroupEvent',)

    }

}

setInterval(reloadTextArea, 500);