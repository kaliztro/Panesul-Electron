const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

let updateAvailable = false;

autoUpdater.on('update-available', (info) => {
    let newAtt = {
        type: 'info',
        buttons: ['Ok'],
        title: 'Atualização disponivel',
        message: `Uma nova versão ${info.version} está sendo baixada.`
    };
    dialog.showMessageBox(newAtt).then(() => {
        updateAvailable = true;
        autoUpdater.downloadUpdate();
    });
});

autoUpdater.on('update-downloaded', () => {
    if (updateAvailable) {
        let RestartMessage = {
            type: 'info',
            title: 'Download concluido.',
            message: 'O download foi concluido com sucesso.',
            detail: 'Gostaria de reiniciar agora?',
            buttons: ['Reiniciar', 'Depois']
        }
        dialog.showMessageBox(RestartMessage).then((returnValue) => {
            if (returnValue.response === 0)
                autoUpdater.quitAndInstall()
        });
    }
});

autoUpdater.on('error', (err) => {
    dialog.showMessageBox({
        type: 'error',
        message: `Erro na atualização: ${err}`
    });
});