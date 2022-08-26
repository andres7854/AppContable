//IMPORTACION DE FUNCIONES DE ARCHIVOS EXTERNOS

const { app, BrowserWindow, Menu, ipcMain } = require('electron');


//FUNCION DE CREACION PARA VENTANA DE LOS GRUPOS

let groupsWindow

function groupsWindowF() {

    groupsWindow = new BrowserWindow({

        width: 1280,
        height: 720,
        title: "App Contable",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    });
    groupsWindow.loadFile('../src/views/groups/groups.html');

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    groupsWindow.on('closed', () => {
        app.quit();
    });

}

//DETECCION DE EVENTOS CREAR GRUPO

ipcMain.on('newGroupEvent', (e, newGroup) => {

    groupsWindow.webContents.send('newGroupEvent', newGroup);

})

//DETECCION DE EVENTOS CREAR GRUPO

ipcMain.on('editGroupEvent', (e, newGroupEdited) => {

    groupsWindow.webContents.send('editGroupEvent', newGroupEdited);

})

//DETECCION DE EVENTOS BORRAR GRUPO

ipcMain.on('groupDeletion', (e) => {

    groupsWindow.webContents.send('groupDeletion');

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


//EXPORTACION DE FUNCIONES PARA LA CREACION DE VENTANA DE GRUPOS

module.exports = {

    groupsWindowF,
    groupsWindow

}