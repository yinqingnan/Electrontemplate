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

let mainWindow //初始化主窗体
let newwin //初始化小窗口
let tray = null; //初始化系统托盘图标


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
    width: 1000,
    frame: false, //值为true或false, 表示是否创建无边框窗口，默认的程序窗口是带外壳的(标题栏，工具栏，边框等)
    resizable: false, //窗口的大小是否可以；true or false，默认值为true
    movable: false, //窗口能否可以被移动；true or false，默认值为 true
    useContentSize: false, //width 和 height 使用web网页size, 这意味着实际窗口的size应该包括窗口框架的size，稍微会大一点，默认为 false
    center: true, //窗口是否在屏幕居中；true or false
    // show: true, //是否显示窗口
    // title: "测试窗口", //窗口的默认标题
    // kiosk: false, //是否使用kiosk模式。如果使用kiosk模式，应用程序将全屏显示，并且阻止用户离开应用。true or false
  })

  mainWindow.loadURL(winURL)
  // mainWindow.loadURL(winURL + '#/login')
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
  //隐藏到系统托盘
  ipcMain.on('hide-main-window', function () {
    mainWindow.hide()
  });

  // 打开一个新的窗口
  ipcMain.on('Addwindow', function (e, val) {
    // console.log(e)   //事件event对象
    // console.log(val)  //传递过来的值
    newwin = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      parent: mainWindow,
      resizable: false, //可否缩放
      movable: false, //可否移动
      minimizable: false, //是否可以最小化
      x: 10,
      y: 10

    })
    newwin.loadURL(winURL + '#/login'); //新开窗口的渲染进程页面
    newwin.on('closed', () => {
      newwin = null
    })
  });
  tray = new Tray(`${__static}/icon.ico`) //图片路径不许存放在根目录下的static内
  tray.on('click', () => {
    mainWindow.show() //窗口显示
    // mainWindow.focus() //窗口获取焦点
  })
  tray.setToolTip('托盘系统测试') //鼠标放到系统托盘图标上时的tips;
  tray.on('right-click', () => {
    var contextMenu = Menu.buildFromTemplate([{
        label: '切换账号',
        click: function () {
          mainWindow.show()
          // mainWindow.focus()
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