import mongoose from "mongoose";

// Replace <databaseName> with the actual name of your database
const uri = "mongodb+srv://duhungminh:datingApp@datingapp.2ygv2bh
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the specified database');
  } catch (error) {
    console.log('Connect to the database failed ', error);
  }
}

export { connectDB };
