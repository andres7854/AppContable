const { ipcRenderer } = require('electron');

const form = document.getElementById('accountCreationForm');

form.addEventListener('submit', (e) => {

    var groupName = document.getElementById('name').value;
    var groupDescription = document.getElementById('description').value;
    var groupPassword = document.getElementById('password').value;

    const newGroup = {

        groupName,
        groupDescription,
        groupPassword

    }

    ipcRenderer.send('newGroupEvent', newGroup);

})
