const { ipcRenderer } = require('electron');

const accounts = document.getElementById('accountsContainer');

ipcRenderer.on('account:new', (e, newAccount) => {

    const newAccountTemplate = `
        <div class="col-xs-4 p-2">
            <div class="card text-center">
                <div class="card-header">
                
                    <p class="card-tittle">${newAccount.name}</p>

                    <input type="hidden" class="password" value="${newAccount.password}">

                </div>

                <div class="card-body">
                    
                    ${newAccount.description}

                </div>

                <div class="card-footer">

                    <button type="button" class="btn btn-success">Editar</button>
                    <!--<button type="button" class="btn btn-danger">Eliminar</button>-->

                </div>

            </div>

        </div> 
    `;

    accounts.innerHTML += newAccountTemplate

});


ipcRenderer.on('delete:account', (e, accountToDelete) => {

    const names = document.querySelectorAll('.card-tittle');
    const passwords = document.querySelectorAll('.password');

    var nameEncountered = false;
    var passwordEncountered = false;

    var itemp1 = 0;  
    var itemp2 = 0;

    names.forEach(name => {
    
        itemp1 = itemp1+1;

        if (name.textContent == accountToDelete.name) {
            
            nameEncountered = true;

            passwords.forEach(password => {

                itemp2 = itemp2+1;

                if (password.value === accountToDelete.password) {
                    
                    passwordEncountered = true;
                    name.parentElement.parentElement.parentElement.remove();

                }else if (itemp2 == passwords.length && passwordEncountered == false) {

                    alert('contraseña incorrecta');

                }

                
                    
        
                

            })
            

        }else if (itemp1 == names.length && nameEncountered == false) {

            alert('nombre de tabla no encontrado')

        }

    });
            

});



