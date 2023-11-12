const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
    const dialogOpts = {
       type: 'info',
       buttons: ['Ok'],
       title: 'Update Available',
       message: process.platform === 'win32' ? releaseNotes : releaseName,
       detail: `Uma nova versão ${app.getVersion()} está sendo baixada.` 
    };
    dialog.showMessageBox(dialogOpts);
  
    updateInterval = null;
 });

 autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
    const dialogOpts = {
       type: 'info',
       buttons: ['Reiniciar', 'Depois'],
       title: 'Application Update',
       message: process.platform === 'win32' ? releaseNotes : releaseName,
       detail: 'Uma nova versão foi baixada, Reinicie para aplica-las.'
    };
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
       if (returnValue.response === 0) autoUpdater.quitAndInstall()
    });
 });

 autoUpdater.on('error', (error) => {
    console.error('Erro durante a atualização:', error.message);
});
