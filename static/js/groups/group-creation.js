const { ipcRenderer } = require('electron');

const form = document.getElementById('accountCreationForm');

function reloadTextArea() {
    
    textArea = document.getElementById('description');

    textArea.style.height = `${textArea.scrollHeight}px`

}

form.addEventListener('submit', (e) => {

    var groupName = document.getElementById('name').value;
    var groupDescription = document.getElementById('description').value;
    var groupPassword = document.getElementById('password').value;
    var groupPasswordCheck = document.getElementById('passwordCheck').value;

    if (groupPassword === groupPasswordCheck) {
        
        const newGroup = {

            groupName,
            groupDescription,
            groupPassword
    
        }

        ipcRenderer.send('newGroupEvent', newGroup);

    }else{

        ipcRenderer.send('incorrectGroupCreation')

    } 

})

setInterval(reloadTextArea, 500);
