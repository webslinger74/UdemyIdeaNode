const fs = require('fs');

// these 2 take 2 functions i.e. fs.readfile & fs.writefile with call backs and wrap them in Promises.

// eslint-disable-next-line func-names
const fileReader = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const fileWriter = (readData) => {
  console.log(readData, 'in the function');
  return new Promise((resolve, reject) => {
    fs.writeFile('./data/fruitData.json', readData, () => {
      resolve(readData);
    });
  });
};

// here using standard way of calling Promise without async await

// fileReader().then((data) => {
//     console.log(JSON.parse(data));
// },(err) => {
//     console.log(err);
// })

// Async await is used to wrap any function that returns a Promise, ie when you are consuming a Promise returned by a function

// const fileReaderAsyncAwait = async () => {
//   try {
//     const data = await fileReader(); // this functin returns a Promise as above
//     console.log(JSON.parse(data));
//     const writeData = await fileWriter(data);
//     console.log(writeData);
//   } catch (error) {
//     console.log(error, 'error async');
//   }
// };

// fileReaderAsyncAwait();

module.exports = { fileReader: fileReader, fileWriter: fileWriter };
