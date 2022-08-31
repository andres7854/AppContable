//IMPORTACION DE MODULOS DE NODE

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isDev = require("electron-is-dev");


//FUNCION DE CREACION PARA VENTANA DE LOS GRUPOS

let openGroupWindow

function openGroupWindowF() {

    openGroupWindow = new BrowserWindow({

        show: false,
        maximized: true,
        title: "Grupo",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }

    });
    openGroupWindow.maximize();
    openGroupWindow.show();
    openGroupWindow.loadFile('./src/views/open-groups/open-group.html');

    if (isDev) {
    
        const mainMenu = Menu.buildFromTemplate(templateMenu);
        Menu.setApplicationMenu(mainMenu);

    }else{

        openGroupWindow.setMenu(null);

    }

    openGroupWindow.on('closed', () => {
        
        openGroupWindow = null;

    });

}

//DETECCION DE EVENTOS CREACION DE VENTANA GRUPO ABIERTO

ipcMain.on('openGroupWindow', (e, groupName) => {

    openGroupWindowF();
    openGroupWindow.webContents.send('openGroup', groupName);

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

if (isDev) {

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


//EXPORTACION DE FUNCIONES PARA LA CREACION DE VENTANA DE GRUPOS

module.exports = {

    openGroupWindowF,
    openGroupWindow

}