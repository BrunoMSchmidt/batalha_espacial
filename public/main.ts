const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
const fs = require ('fs');
const os = require('os');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.ts'),
    },
    fullscreen: false, // true
    frame: true,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

function sair() {
  app.quit();
}

function saveConfig(config) {
  const folderPath = path.join(os.tmpdir(), 'batalha_espacial');
  const filePath = path.join(folderPath, 'config.json');
  if(!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, { recursive: true });
  }

  console.log(config);

  const dataToSave = JSON.stringify(config);
  fs.writeFile(filePath, dataToSave, (err) => {
    if(err) {
      mainWindow.webContents.send("fromMain", { success: false, message: err });
    } else {
      mainWindow.webContents.send("fromMain", { success: true });
    }
  });

}

function getConfig() {
  const configPath = path.join(os.tmpdir(), 'batalha_espacial', 'config.json');
  fs.readFile(configPath, (err, data) => {
    if(err){
      mainWindow.webContents.send("fromMain", { success: false, message: err });
    } else {
      const jsonString = Buffer.from(data).toString('utf8')
      const parsedData = JSON.parse(jsonString)

      mainWindow.webContents.send("fromMain", { success: true, result: parsedData });
    }
  })
}

ipcMain.on('toMain', (event, args) => {
  if (args.funcao === 'sair') sair();
  if (args.funcao === 'getConfig') getConfig();
  if (args.funcao === 'saveConfig') saveConfig(args.config);
});
