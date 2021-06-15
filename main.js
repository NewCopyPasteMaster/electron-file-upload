const { app, BrowserWindow } = require('electron') 






function createWindow () { 
 
	// Fenster erstellen
const win = new BrowserWindow({ 
	width: 800, 
	height: 600, 
	webPreferences: { 
	nodeIntegration: true
	} 
}) 

	// index laden
win.loadFile('src/index.html') 

	// öffnet DevTools beim Start
win.webContents.openDevTools() 
} 

// startet die App wenn alles rdy ist
app.whenReady().then(createWindow) 

// schließt wenn das Fenster geschlossen wird 
app.on('window-all-closed', () => { 
	
// On macOS it is common for applications and their menu bar 
// To stay active until the user quits explicitly with Cmd + Q 
if (process.platform !== 'darwin') { 
	app.quit() 
} 
}) 

app.on('activate', () => { 
// On macOS it's common to re-create a window in the 
// app when the dock icon is clicked and there are no 
// other windows open. 
if (BrowserWindow.getAllWindows().length === 0) { 
	createWindow() 
} 
}) 

// In this file, you can include the rest of your 
// app's specific main process code. You can also 
// put them in separate files and require them here. 
