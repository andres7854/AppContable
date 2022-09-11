//IMPORTACION DE MODULOS DE NODE

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isDev = require("electron-is-dev");


//FUNCION DE CREACION PARA VENTANA DE LOS GRUPOS

let openPayrollWindow;

async function openPayrollWindowF() {

    openPayrollWindow = new BrowserWindow({

        show: false,
        maximized: true,
        title: "Objeto abierto",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }

    });
    openPayrollWindow.maximize();
    openPayrollWindow.show();
    await openPayrollWindow.loadFile('./src/views/objects/open-payroll.html');

    if (isDev) {
    
        const mainMenu = Menu.buildFromTemplate(templateMenu);
        Menu.setApplicationMenu(mainMenu);

    }else{

        openPayrollWindow.setMenu(null);

    }

    openPayrollWindow.on('closed', () => {
        
        openPayrollWindow = null;

    });

}

//DETECCION DE EVENTOS CREACION DE VENTANA DE NOMINA ABIERTA

ipcMain.on('openPayroll', async (e, objectSelected) => {

    await openPayrollWindowF(); 
    openPayrollWindow.webContents.send('openPayroll', objectSelected);

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

    openPayrollWindowF,
    openPayrollWindow

}