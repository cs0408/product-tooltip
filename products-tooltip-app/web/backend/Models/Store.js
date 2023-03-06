import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    store: {
      type: String,
      required: [true, "Store is required field."],
      trim: true,
    },
    session: {
      type: Object,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Store = new mongoose.model("Store", storeSchema);
export default Store;
