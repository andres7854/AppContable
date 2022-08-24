// REQUERIMENTO DE MODULOS DE NODE.JS

const { BrowserWindow, Menu, ipcMain, ipcRenderer } = require('electron');


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

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    editGroupWindow.loadFile('../src/views/groups/edit-group.html');

    editGroupWindow.on('closed', () => {
        editGroupWindow = null;
    });

}


//DETECCION DE EVENTOS CREACION DE VENTANA DE NUEVO GRUPO

ipcMain.on('editGroupWindow', (e, groupName) => {

    editGroupWindowF();

    editGroupWindow.webContents.send('editGroupWindow', groupName);

})


//DETECCION DE EVENTOS CIERRE DE VENTANA DE NUEVO GRUPO

ipcMain.on('newGroupEvent', (e) => {

    editGroupWindow.close();
    
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