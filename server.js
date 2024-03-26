const express = require('express');
const fs = require('fs');
const app = express();
const port = 8383;

//loading static json file
//const data = require('./data.json');
//console.log(data)

//asychronous loading of json file

const path = './data.json';

/* fs.readFile(path,"utf8",(error,data) =>{
    if(error){
        console.log(error);
        return;
    }
    console.log(JSON.parse(data));
}); */

//aschronous writing to a json file

/* const profile = {name:'Ivan', age: 24};

fs.writeFile(path,JSON.stringify(profile,null,2), (error) =>{
    if(error){
        console.log('an error has occured', error);
        return;
    }
    console.log('data writen successfuly');
}) */

//playing around with json serialization
//const data = JSON.stringify({name:'Ivan', age: 24});
//console.log(JSON.parse(data));

//writing and updating our json file
function updateData(__data) {

    let oldArray = [];
    fs.readFile(path, "utf8", (error, data) => {
        if (error) {
            console.log(error);
            return;
        } else if (data != "") {
            oldArray = oldArray.concat(JSON.parse(data));
        }
        //console.log('this is the old array', oldArray);
        oldArray.push(__data);
        //console.log('this is the new array', oldArray);
        fs.writeFile(path, JSON.stringify(oldArray), (error) => {
            if (error) {
                console.log('an error has occured', error);
                return;
            }
            console.log('data written successfuly');
        })
    });
}

app.use(express.static('public'));
app.use(express.json());

//get routes
app.get('/info', (req, res) => {
    res.status(200).json({ info: 'preset text' })
})

//post routes
app.post('/', (req, res) => {
    const parcel = req.body
    console.log(parcel.parcel)
    if (!parcel) {
        return res.status(400).send({ status: 'failed' })
    }
    res.status(200).send({ status: 'recieved' })
})

//handling sent profile object

app.post('/submit', (req, res) => {
    const profileData = req.body
    updateData(profileData);
    if (!profileData) {
        return res.status(400).send({ status: 'failed' })
    }
    res.status(200).send({ status: 'recieved' })
})

//sending profile data to user
app.get('/load', (req, res) => {
    let oldArray = [];
    fs.readFile(path, "utf8", (error, data) => {
        if (error) {
            console.log(error);
            return;
        } else if (data != "") {
            oldArray = oldArray.concat(JSON.parse(data));
        }
        res.status(200).json(oldArray)
    });
})

app.listen(port, () => console.log(`server has started on port: ${port}`))
