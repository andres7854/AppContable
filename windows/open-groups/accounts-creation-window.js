function newAccountWindowF() {
    
    newAccountWindow = new BrowserWindow({

        width: 800,
        height: 600,
        title: "Añadir una cuenta nueva",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    });

    newAccountWindow.setMenu(null);
    newAccountWindow.loadURL(url.format({

        pathname: path.join(__dirname, 'views/new-account.html'),
        protocol: 'file',
        slashes: true

    }))

    newAccountWindow.on('closed', () => {
        newAccountWindow = null;
    });

}