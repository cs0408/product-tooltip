import { Stores, VolumeDiscounts } from "../Models/index.js";

const getVolumeDiscount = async (req, res) => {
  try {
    const { product, collections } = req.body;

    const findStore = await Stores.findOne({
      store: req.headers.origin.split("//")[1],
    });
    if (!findStore) throw new Error("Store not found");

    const volumeDiscount = await VolumeDiscounts.find({
      store: findStore._id,
      "offer.active": true,
    });

    res.status(200).send({ ...volumeDiscount[0]?._doc });
  } catch (error) {
    res.status(200).send({ error: error });
  }
};

export default getVolumeDiscount;
