const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
    let win = new BrowserWindow({
        width: 1200,
        height: 720,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.ts")
        },
        fullscreen: true,
        frame: false
    })

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    win.on("closed", () => (win = null));
}

app.on('ready', createWindow);

app.on('bom-dia', () => console.log('teste'));

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

function sair() {
    app.quit();
}

ipcMain.on("toMain", (event, args) => {
    console.log(args);
    if (args.funcao === "sair")
        sair();
});
