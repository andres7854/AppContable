//REQUERIMIENTO DE MODULOS DE NODE.JS

const { ipcMain, BrowserWindow, Menu, Notification, ipcRenderer } = require('electron');

//DECLARACION E INICIO DE FUNCION CREACION DE VENTANA PARA BORRAR GRUPOS

let groupDeletingWindow

function groupDeletingWindowF() {
    
    groupDeletingWindow = new BrowserWindow({

        width: 800,
        height: 600,
        title: "¿BORRAR UNA CUENTA?",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    })

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    groupDeletingWindow.loadFile('../src/views/groups/delete-group.html')

}


//DETECCION DE EVENTOS CREACION DE VENTANA PARA ELIMINACION DE GRUPO

ipcMain.on('groupDeletionWindow', (e) => {

    groupDeletingWindowF();

})

//DETECCION DE EVENTOS NOTIFICACIONES

ipcMain.on('incorrectDelete', (e, deletionStatus) => {

    if (deletionStatus === 'the paswords are different') {
        
        const NOTIFICATION_TITLE = 'ELIMINACION INCORRECTA';
        const NOTIFICATION_BODY = 'las contraseñas introducidas no coinciden';
        new Notification({title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY}).show();

    }else if(deletionStatus === `name of group don't encountered`){

        const NOTIFICATION_TITLE = 'ELIMINACION INCORRECTA';
        const NOTIFICATION_BODY = 'el nombre de grupo no ha sido encontrado';
        new Notification({title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY}).show();

    }else if(deletionStatus === 'the pasword is incorrect'){

        const NOTIFICATION_TITLE = 'ELIMINACION INCORRECTA';
        const NOTIFICATION_BODY = 'la contraseña introducida es incorrecta';
        new Notification({title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY}).show();

    }

})

//DTECCION DE EVENTOS CIERRE DE VENTANA PARA ELIMINACION DE GRUPOS

ipcMain.on('groupDeletion', (e) => {

    const NOTIFICATION_TITLE = 'ELIMINACION CORRECTA';
    const NOTIFICATION_BODY = 'grupo borrado exitosamente';
    new Notification({title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY}).show();

    groupDeletingWindow.close()

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


module.exports = {};