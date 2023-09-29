const mongoose = require('mongoose');
const Item = require('../models/items');
const faker = require('faker');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const generateItem = (num)=> {
    const Item = [];

    for (let i=0; i<num; i++){
        const name = faker.commerce.lunchBag();
        const description = faker.lorem.storage();
        const price = parseFloat(faker.commerce.price());

        Item.push({
            name,
            description,
            price,
          });
     }
    
    return Item;
    };

   const Item = generateItem(20);
    console.log(Item);

  Item.insertMany(Item)
  .then(() => {
  console.log('Items inserted into the database successfully');
  })
 .catch((error) => {
  console.error('Error inserting items into the database:', error);
  });

 // module.exports = {generateItem};