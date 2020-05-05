/*
 * @Author: RA
 * @Date: 2020-04-01 15:59:57
 * @LastEditTime: 2020-04-27 10:50:05
 * @LastEditors: RA
 * @Description: 
 */
// 引入electron并创建一个Browserwindow
const fs = require('fs');
const { app, Menu, BrowserWindow, globalShortcut, ipcMain } = require('electron');
// const path = require('path');
//打开目录地址
// const path1 = 'd:';
// shell.openItem(path1);
Menu.setApplicationMenu(null) //取消菜单栏
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

function createWindow() {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    useContentSize: true,
    frame: false,
    webPreferences: {
      frame: false,
      resizable: false,
      nodeIntegration: true
    }
  })
  /** 加载应用-----  electron-quick-start中默认的加载入口
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  */
  // 加载应用----适用于 react 项目
  mainWindow.setIcon('./src/common/images/logo.png');
  mainWindow.loadURL('http://localhost:3000/');
  // mainWindow.loadFile('./build/index.html')
  mainWindow.setMinimumSize(900, 500)
  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null
  })

}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})
//快捷键监听全局模式；
app.on('ready', () => {
  globalShortcut.register('Alt+X', () => {
    mainWindow.show(); //alt+x打开软件；
  });
  globalShortcut.register('Alt+Z', () => {
    mainWindow.minimize(); //alt+c最小化软件
  });
  globalShortcut.register('Alt+C', () => {
    app.exit(); //alt+z退出软件，测试期间使用
  });
  globalShortcut.register('Alt+K', () => {
    mainWindow.webContents.openDevTools(); //进入调试模式
  });
  globalShortcut.register('Alt+L', () => {
    mainWindow.webContents.closeDevTools(); //关闭调试模式
  });
  globalShortcut.register('Alt+Q', () => {
    mainWindow.reload(); //刷新页面
  });
  //自定义窗口最小化,最大化,关闭按钮
  ipcMain.on('min', e => mainWindow.minimize());
  ipcMain.on('max', e => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  });
  ipcMain.on('close', e => mainWindow.close());

});

// F:/CloudMusic/                       
// C:/Users/Xiang/Music
const data = fs.readdirSync('F:/CloudMusic/');
const id3 = require('node-id3');
ipcMain.on('files', function (event) {
  const localList = [];
  data.forEach(element => {
    if (
      element.indexOf('.wav') !== -1 ||
      element.indexOf('.mp3') !== -1 ||
      element.indexOf('.ogg') !== -1 ||
      element.indexOf('.acc') !== -1 ||
      element.indexOf('.flac') !== -1
    ) {
      let obj = {};
      let tags = id3.read('F:/CloudMusic/' + element)
      obj.album = tags.album;
      obj.title = tags.title;
      obj.artist = tags.artist;
      // obj.trackNumber = Number(tags.trackNumber);
      obj.url = 'f:/CloudMusic/' + element;
      // obj.tags = tags;
      // let image = tags.image.imageBuffer;
      // obj.image = image.imageBuffer;
      // if (image) {
        // var base64String = "";
        // for (var i = 0; i < image.length; i++) {
        //   base64String += String.fromCharCode(image[i]);
        // }
        // image.forEach(element => {
          // base64String += String.fromCharCode(element)
        // });
        // console.log(base64String)
        // var base64 = "data:image/jpeg;base64," + btoa(base64String);
        // console.log(base64)
        // obj.pic = base64
      // }
      localList.push(obj)
    }
  });
  // console.log(localList)
  event.returnValue = localList;
});