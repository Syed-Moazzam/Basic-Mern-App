const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/Basic-Mern-App';

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected To MongoDB Successfully.");
    })
}

module.exports = connectToMongo;