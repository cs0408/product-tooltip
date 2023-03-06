import { Stores, VolumeDiscounts } from "../Models/index.js";

const createVoulmeDiscount = async ({ body, session }) => {
  const findStore = await Stores.findOne({ store: session.shop });
  if (!findStore) throw new Error("Store not found.");

  // create volume discount
  const newVolumeDiscount = await VolumeDiscounts.create({
    store: findStore._id,
    ...body,
  });

  if (!newVolumeDiscount) throw new Error("Voulme not created.");

  return newVolumeDiscount;
};

export default createVoulmeDiscount;
