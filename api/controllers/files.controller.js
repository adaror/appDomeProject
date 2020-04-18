const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function createPromise(path,fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${path}/${fileName}`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({[fileName]: data});
            }
        })
    })
}

async function getTextFiles() {
    const p = path.join(__dirname, '../../','textfiles');
    const filesNames = fs.readdirSync(p);
    let filesPromiseArr = []

    for (let i=0; i< filesNames.length; i++) {
        filesPromiseArr.push(createPromise(p, filesNames[i]));
    }
    const files = await Promise.all(filesPromiseArr);
    return files;
}

function scanObjAndSetPath(obj, pathObj) {
    let keys = Object.keys(obj);
    for (let i=0; i<keys.length; i++) {
        if (typeof obj[keys[i]] === 'object') {
            let currPath=pathObj + `${keys[i]}.`;
            scanObjAndSetPath(obj[keys[i]], currPath);
        }
        if (obj[keys[i]] === '') {
            obj[keys[i]] = `${pathObj}${keys[i]}`
        }
    }
}


function setObjectPath(obj) {
    scanObjAndSetPath(obj, '');
    return obj;
}
async function parseFile(user, fileName) {
   let response = '';
   const filetType = fileName.split('.')[1];
   const child = spawn('python', [
       "-u",
       "parseFile.py",
       "--file",
       `./apps/${fileName}`
       ]);
    process.stdin.pipe(child.stdin);

    for await (const data of child.stdout) {
        response = JSON.parse(data.toString());
      };

    return (user.platforms === filetType && user.reactAllowed === response.react)

}

module.exports = {
    getTextFiles,
    setObjectPath,
    parseFile
}