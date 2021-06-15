const electron = require('electron');
const path = require('path');

const fs = require('fs');
const axios = require('axios');

// Importing dialog module using remote
const dialog = electron.remote.dialog;

var uploadFile = document.getElementById('upload');

// Defining a Global file path Variable to store
// user-selected file
global.filepath = undefined;

uploadFile.addEventListener('click', () => {
    // If the platform is 'win32' or 'Linux'
    if (process.platform !== 'darwin') {
        // Resolves to a Promise<Object>
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Upload',
            // Restricting the user to only "x" Files.
            filters: [{
                name: 'All Files',
                extensions: ['json' /*PLATZHALTER*/ ]
            }, ],
            // Specifying the File Selector Property
            properties: ['openFile']
        }).then(file => {

            // cancelled or not.
            console.log(file.canceled)
            if (!file.canceled) {
                // Updating the GLOBAL filepath variable
                // to user-selected file.
                global.filepath = file.filePaths[0].toString();
                console.log(global.filepath);
                if (global.filepath && !file.canceled) {
                    var formData = new FormData();
                    formData.append('file', fs.createReadStream(global.filepath));
                    axios.post('[Custom URL]', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }

            }
        }).catch(err => {
            console.log(err)
        });
    } else {
        // If the platform is 'darwin' (macOS)
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Upload',
            filters: [{
                name: 'All Files',
                extensions: ['']
            }, ],
            // Specifying the File Selector and Directory
            // Selector Property In macOS
            properties: ['openFile', 'openDirectory']
        }).then(file => {
            console.log(file.canceled);
            if (!file.canceled) {
                global.filepath = file.filePaths[0].toString();
                console.log(global.filepath);
            }
        }).catch(err => {
            console.log(err)
        });
    }

});