const fs = require('fs');

//read directory files
const dirPath = '../../Group-II-Shoppers/assets/images/mobile-phones/';
const path = './dir.json'
const fileList = fs.readdirSync(dirPath);

//write a json file for the tree
function readDir(list){
    fs.writeFile(path, JSON.stringify(list), (error) => {
        if (error) {
            console.log('an error has occured', error);
            return;
        }
        console.log('data written successfuly');
    })
    return;
}

readDir(fileList);
