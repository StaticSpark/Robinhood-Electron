/*
 * @author Pinghao Qi
 * 
 * Started out using skeleton code from the author below:
 * Copyright (C) 2016. All Rights Reserved.
 *
 * @author  Arno Zhang
 * @email   zyfgood12@163.com
 * @date    2016/06/22
 */

'use strict';

const electron = require('electron');
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    ipcRenderer
} = electron;


let isDevelopment = true;

if (isDevelopment) {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`),
        ignored: /node_modules|[\/\\]\./
    });
    require('electron-debug')({
        showDevTools: true
    });

    require('electron-context-menu')();
}


let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minHeight: 600,
        minWidth: 800
    });

    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})