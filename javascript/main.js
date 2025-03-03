const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const notifier = require('node-notifier'); // Importe o node-notifier

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
        // Exibe a notificação "Procurando por atualizações"
        notifier.notify({
            title: 'Atualizações',
            message: 'Procurando por atualizações...',
            icon: './img/Panesul.ico',
            appID: 'Panesul',
            sound: false, // Desative o som, se necessário
            wait: false, // Não espere por interação do usuário
            timeout: 3000,
        });

        // Verifica atualizações
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