const deleteBtn = document.querySelector("#accountDeletionFormSubmitBtn");

const { ipcRenderer } = require('electron');

deleteBtn.addEventListener('click', e => {

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    const accountToDelete = {

        name: name,
        password: password

    }

    ipcRenderer.send('delete:account', accountToDelete);

    focusedWindow.quit();

})



