const mongoose = require('mongoose');


const connectDB = async() => {
try {
    await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to Mongo server");
} catch (error) {
    console.log("Failed to connect to Mongo server");
    console.log(error);
}
};
module.exports = connectDB;