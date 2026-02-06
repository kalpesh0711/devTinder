const mongoose =require('mongoose');

mongoose.connect("mongodb+srv://namastedev:mongodb%401234@cluster0.e4bat6v.mongodb.net/");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://namastedev:mongodb%401234@cluster0.e4bat6v.mongodb.net/"
    );
};

connectDB()
  .then(() => {
    console.log("Database connection established...");
  })
  .catch((err)=>{
    console.log("database can't be connected")
  })