const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

let updateAvailable = false;
let cooldownActive = false;

autoUpdater.on('update-available', (info) => {
    let newAtt = {
        type: 'info',
        buttons: ['Ok'],
        title: 'Atualização disponível',
        message: `Uma nova versão ${info.version} está sendo baixada.`
    };
    dialog.showMessageBox(newAtt).then(() => {
        if (!cooldownActive) {
            cooldownActive = true;
            setTimeout(() => {
                updateAvailable = true;
                autoUpdater.downloadUpdate();
                cooldownActive = false; 
            }, 60000);
        }
    });
});

autoUpdater.on('update-downloaded', () => {
    if (updateAvailable) {
        let RestartMessage = {
            type: 'info',
            title: 'Download concluído.',
            message: 'O download foi concluído com sucesso.',
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
    // Verifique se o erro é devido a credenciais inválidas
    if (err.message.includes('401')) {
        console.log('Token expirado ou credenciais inválidas. Ignorando erro.');
    } else {
        dialog.showMessageBox({
            type: 'error',
            message: `Erro na atualização: ${err}`
        });
    }
});