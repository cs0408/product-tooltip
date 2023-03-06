import mongoose from "mongoose";

const volumeDiscount = new mongoose.Schema(
  {
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    offer: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VolumeDiscount = new mongoose.model("VolumeDiscount", volumeDiscount);
export default VolumeDiscount;
