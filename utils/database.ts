import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const uri = process.env.MONGO_DB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "code_chronicle",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
