import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`)
  } catch (error: any) {
    throw new Error("Error while connection to database : ", error.message);
  }
};

export { connectDatabase };
