const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
   userName: String,
   password: String,
   email: String,
   googleId: {type: String},
   thumbnail: String,
   facebookId: String,
   image: String,
   location: String,
   savingAmount: String,
   role: {
     type: String,
     default:'user',
     enum: ['admin','user']
    }
  },
  {
    timestamp: true,
    versionKey: false,
   } 
);
const User = mongoose.model('User', userSchema);

module.exports = User;