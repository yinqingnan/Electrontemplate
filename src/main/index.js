import {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu
} from 'electron'
const path = require('path');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray = null;
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  Menu.setApplicationMenu(null) // 隐藏菜单栏
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true, //居中
    width: 1000,
    frame: false, //添加这一行采用无边框窗口
  })

  mainWindow.loadURL(winURL)
  mainWindow.webContents.openDevTools() //打包后开启控制台   不需要可注释
  mainWindow.on('closed', (e) => {
    mainWindow = null
    e.preventDefault()
  })

  // 关闭
  ipcMain.on('close', e =>
    mainWindow.close()
  )
  // 最大化
  ipcMain.on('max-window', () => {
    mainWindow.maximize()
  })
  // 最小化
  ipcMain.on('min-window', () => {
    mainWindow.minimize()
  })

  ipcMain.on('show', () => {
    // tray.setHighlightMode('always')
  })

  ipcMain.on('hide-main-window', function () {
    mainWindow.hide()
  });

  tray = new Tray(`${__static}/icon.ico`) //图片路径不许存放在根目录下的static内
  tray.on('click', () => {
    mainWindow.show()
    mainWindow.focus()
  })
  tray.setToolTip('托盘系统测试') //鼠标放到系统托盘图标上时的tips;
  tray.on('right-click', () => {
    var contextMenu = Menu.buildFromTemplate([{
        label: '切换账号',
        click: function () {
          mainWindow.show()
          mainWindow.focus()
          mainWindow.webContents.send('datamsg', '切换到登陆界面去') //将数据传递到渲染进程
        }
      },
      {
        label: '退出系统',
        click: function () {
          tray.destroy()
          app.quit()
        }
      }
    ]);
    tray.setContextMenu(contextMenu);
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */