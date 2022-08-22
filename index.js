//VINCULACION DE ARCHIVOS PRINCIPALES EXTERNOS CON EL ARCHIVO PRINCIPAL INICIAL

const { groupsWindowF } = require('./windows/groups/groups-window');

const groupsCreationWindow = require('./windows/groups/group-creation-window');

const groupsDeletionWindow = require('./windows/groups/group-deletion-window');

// REQUERIMENTO DE MODULOS DE NODE.JS

const { app, BrowserWindow, Menu, autoUpdater, ipcMain, ipcRenderer } = require('electron');

const Store = require('electron-store');

const url = require('url');
const path = require('path');
const { electron } = require('process');
const { Console } = require('console');


//CONDICIONAL DE RECARGA AUTOMATICA EN CASO DE ESTAR EN AMBIENTE DE PRODUCCION

if (process.env.NODE_ENV !== 'production') {

    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })

}

//INICIO DE APLICACION

app.whenReady().then(groupsWindowF);


//DETECCION DE EVENTOS BORRAR CUENTA

ipcMain.on('delete:account', (e, accountToDelete) =>{

    mainWindow.webContents.send('delete:account', accountToDelete);
    accountDeletingWindow.close()

});

//DETECCION DE EVENTOS CREAR CUENTA

ipcMain.on('account:new', (e, newAccount) =>{

    mainWindow.webContents.send('account:new', newAccount);
    newAccountWindow.close()

});

