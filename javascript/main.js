const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 950,
        minHeight: 600,
        minWidth: 400,

        icon: './img/Panesul.ico',
        autoHideMenuBar: true,
    
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadFile('html/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    mainWindow.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

require('./updater');

