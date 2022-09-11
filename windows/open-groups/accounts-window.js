const { app, BrowserWindow, Menu, autoUpdater, ipcMain, ipcRenderer } = require('electron');

let accountsWindow

function accountsWindowF() {

    accountsWindow = new BrowserWindow({

        width: 1280,
        height: 720,
        title: "App Contable",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    });
    accountsWindow.loadFile('views/index.html');

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    accountsWindow.on('closed', () => {
        app.quit();
    });

}

const templateMenu = [

    {
        label: 'Cuentas',
        submenu: [
            {
                label: 'Nueva cuenta',
                click(){
                    newAccountWindowF();
                }
            },
            {
                label: 'Borrar cuenta',
                click(){
                    accountDeletingWindowF();
                }
            }
        ]
        
    },
    {

        label: 'Prueba',

    }

]

if(process.platform === 'darwin') {

    templateMenu.unshift({
        label: app.getName()
    });

}

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

module.exports = {

    accountsWindowF

}