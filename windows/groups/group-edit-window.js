// REQUERIMENTO DE MODULOS DE NODE.JS

const { BrowserWindow, Menu, ipcMain, ipcRenderer, Notification } = require('electron');
const isDev = require("electron-is-dev");


//DECLARACION E INICIO DE FUNCION CREACION DE VENTANA DE NUEVO GRUPO

let editGroupWindow


//FUNCION PARA CREACION DE LA VENTANA

function editGroupWindowF() {

    editGroupWindow = new BrowserWindow({

        width: 800,
        height: 600,
        title: "Editar un grupo",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    });

    if (isDev) {
    
        const mainMenu = Menu.buildFromTemplate(templateMenu);
        Menu.setApplicationMenu(mainMenu);

    }else{

        editGroupWindow.setMenu(null);

    }
    editGroupWindow.loadFile('./src/views/groups/edit-group.html');

    editGroupWindow.on('closed', () => {
        editGroupWindow = null;
    });

}


//DETECCION DE EVENTOS CREACION DE VENTANA DE NUEVO GRUPO

ipcMain.on('editGroupWindow', (e, groupName) => {

    editGroupWindowF();

    editGroupWindow.webContents.send('editGroupWindow', groupName);

})


//DETECCION DE EVENTOS CIERRE DE VENTANA DE NUEVO GRUPO Y NOTIFICACIONES

ipcMain.on('editGroupEvent', (e) => {

    editGroupWindow.close();
    
})

ipcMain.on('incorrectEditGroup', (e) => {

    const NOTIFICATION_TITLE = 'GRUPO NO EDITADO';
    const NOTIFICATION_BODY = 'la contraseña introducida es incorrecta';
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