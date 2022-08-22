const { ipcRenderer } = require('electron');

const form = document.getElementById('groupDeletionForm');

form.addEventListener('submit', (e) => {

    var groupName = document.getElementById('name').value;
    var groupPassword = document.getElementById('password').value;
    var groupPasswordConfirmation = document.getElementById('passwordConfirmation').value;

    if (groupPassword === groupPasswordConfirmation) {
        
        var keyOfGroup = JSON.parse(localStorage.getItem(groupName));

        if (keyOfGroup != null) {
     
            if (groupPassword == keyOfGroup.groupPassword) {
                
                localStorage.removeItem(groupName);
                ipcRenderer.send('groupDeletion');

            }else{

                const deletionStatus = 'the pasword is incorrect'
                ipcRenderer.send('incorrectDelete', deletionStatus)

            }

        }else{

            const deletionStatus = `name of group don't encountered`
            ipcRenderer.send('incorrectDelete', deletionStatus)

        }

    }else{
 
        const deletionStatus = 'the paswords are different'
        ipcRenderer.send('incorrectDelete', deletionStatus)

    }
 
    e.preventDefault

})