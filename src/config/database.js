const mongoose =require('mongoose');

const connectDB = async () => {
    return mongoose.connect(
        "mongodb+srv://namastedev:mongodb%401234@cluster0.e4bat6v.mongodb.net/devTinder"
    );
};

module.exports = connectDB;

