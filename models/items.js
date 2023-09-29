const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description : String,
    price: {
        type: String,
        required: true,
    },
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;