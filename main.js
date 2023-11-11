const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const { autoUpdater } = require('electron-updater');

// Carrega o módulo autoUpdater
// require('./autoUpdater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 950,
    minHeight: 600,
    minWidth: 400,
    autoHideMenuBar: true,
    icon: './img/Panesul.ico'
  });

  // Carrega o arquivo HTML da sua interface de usuário
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './html/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('atualizacao_disponivel');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('atualizacao_baixada');
});

