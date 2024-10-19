const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/facemark?directConnection=true";
// it's local database ....facemark

const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectToMongo