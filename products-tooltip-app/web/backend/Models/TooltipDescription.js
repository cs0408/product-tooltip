import mongoose from "mongoose";

const tooltipDescriptionSchema = new mongoose.Schema(
  {
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    productID: { type: String, required: true },
    tooltip: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const TooltipDescription = new mongoose.model(
  "TooltipDescription",
  tooltipDescriptionSchema
);
export default TooltipDescription;
