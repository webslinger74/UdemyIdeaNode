const fs = require('fs');
const path = require('path');
console.log(path.join(__dirname, '/../data.json'));

// Simple example of async await

const asyncTest = async () => {
const fileData = await fs.readFileSync(path.join(__dirname, '/../data.json'));   // this will return a promise so can use .then()
const fileDataObj = JSON.parse(fileData);
return fileDataObj;    // return the object and this will be part of a resolved promise
};


asyncTest().then(value => {
    console.log(value, "the data has been found!");
}).catch(err => {
    console.log(err);
})