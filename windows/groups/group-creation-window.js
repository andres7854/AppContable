// REQUERIMENTO DE MODULOS DE NODE.JS

const { BrowserWindow, Menu, ipcMain, Notification } = require('electron');


//DECLARACION E INICIO DE FUNCION CREACION DE VENTANA DE NUEVO GRUPO

let newGroupWindow


//FUNCION PARA CREACION DE LA VENTANA

function newGroupWindowF() {

    newGroupWindow = new BrowserWindow({

        width: 800,
        height: 600,
        title: "Añadir un grupo nuevo",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    });

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    newGroupWindow.loadFile('../src/views/groups/new-group.html');

    newGroupWindow.on('closed', () => {
        newGroupWindow = null;
    });

}


//DETECCION DE EVENTOS CREACION DE VENTANA DE NUEVO GRUPO

ipcMain.on('groupCreationWindow', (e) => {

    newGroupWindowF();

})


//DETECCION DE EVENTOS CIERRE DE VENTANA DE NUEVO GRUPO

ipcMain.on('newGroupEvent', (e) => {

    const NOTIFICATION_TITLE = 'CREACION CORRECTA';
    const NOTIFICATION_BODY = 'el grupo ha sido creado exitosamente';
    new Notification({title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY}).show();
    newGroupWindow.close();
    
})

//DETECCION DE EVENTOS NOTIFICACIONES

ipcMain.on('incorrectGroupCreation', (e) => {

    const NOTIFICATION_TITLE = 'CREACION INCORRECTA';
    const NOTIFICATION_BODY = 'las contraseñas introducidas no coinciden';
    new Notification({title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY}).show();
    
})

//TEMPLATE DE MENU PARA VENTANA DE LOS GRUPOS

const templateMenu = [

    {
        label: 'Grupos'
        
    },

]

//CONDICIONAL EN CASO DE USAR LA APLICACION EN MAC

if(process.platform === 'darwin') {

    templateMenu.unshift({
        label: app.getName()
    });

}

//CONDICIONAL EN CASO DE ESTAR EN AMBIENTE DE PRODUCCION

if (process.env.NODE_ENV !== 'production') {

    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
    
}

//VINCULACION CON EL ARCHIVO PRINCIPAL

module.exports = {}