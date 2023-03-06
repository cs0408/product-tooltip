import mongoose from "mongoose";

const connectDB = () => {
  const connectionParams = { useNewUrlParser: true };
  mongoose.set("strictQuery", true);

  mongoose.connect(
    "mongodb+srv://chandantechinfini:u37WpqwQLbV3nG0x@cluster0.spojv9o.mongodb.net/products-tooltip?retryWrites=true&w=majority",
    connectionParams
  );

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully !!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to MongoDB !!");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected !!");
  });
};

export default connectDB;
