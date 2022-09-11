const { ipcRenderer } = require("electron")

ipcRenderer.on('editGroupWindow', (e, groupName) => {

    var groupToEdit = JSON.parse(localStorage.getItem(groupName))

    var groupNameElement = document.getElementById('groupName');
    var groupDescriptionElement = document.getElementById('description');

    groupNameElement.textContent = `${groupName}`;
    groupDescriptionElement.value = `${groupToEdit.groupDescription}`;

})

function reloadTextArea() {
    
    textArea = document.getElementById('description');

    textArea.style.height = `${textArea.scrollHeight}px`

}

function editGroupEvent(event) {

    event.preventDefault();

    var groupName = document.getElementById('groupName').textContent;
    var groupDescription = document.getElementById('description').value;
    var groupPassword = document.getElementById('password').value;

    var groupToEdit = JSON.parse(localStorage.getItem(groupName))
    
    var newGroupEdited = {

        groupName,
        groupDescription,
        groupPassword

    }

    if (groupPassword === groupToEdit.groupPassword) {

        ipcRenderer.send('editGroupEvent', newGroupEdited);

    } else {

        ipcRenderer.send('incorrectEditGroup');

    }

}

setInterval(reloadTextArea, 200);