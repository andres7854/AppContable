const form = document.getElementById('accountCreationFormSubmitBtn');

const { ipcRenderer } = require('electron');

form.addEventListener('click', e => {

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const password = document.getElementById('password').value;

    const newAccount = {

        name: name,
        description: description,
        password: password,

    }
    
    
    ipcRenderer.send('account:new', newAccount);

    focusedWindow.quit();
})