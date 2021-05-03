require('dotenv').config();
const connect = require('../database/database');
const Fruit = require('../models/fruitModel');

const data = [
  { fruitName: 'dragonfruit', price: 5.99, description: 'exotic fruit' },
  { fruitName: 'PineApple', price: 5.99, description: 'a very sweet fruit' },
  { fruitName: 'Peach', price: 2.4, description: 'soft and juicy' },
  { fruitName: 'Apple', price: 1.99, description: 'A great all round fruit' },
  { fruitName: 'Cherries', price: 1.99, description: 'very expensive fruit' },
  { fruitName: 'Tomato', price: 5.99, description: 'soft and juicy' },
];

const createDataBaseData = async () => {
  try {
    connect();
    const result = await Fruit.create(data);
    console.log(result, 'the result');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);

if (process.argv[2] !== undefined && process.argv[2] === '--help') {
  console.log('add --import and the data will be imported to your database');
}

if (process.argv[2] !== undefined && process.argv[2] === '--import') {
  console.log('here we go');
  createDataBaseData();
}
