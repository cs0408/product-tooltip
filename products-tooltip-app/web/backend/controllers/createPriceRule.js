import shopify from "../../shopify.js";
import { VolumeDiscounts } from "../Models/index.js";
import generateRandomString from "../utils/generateRandomString.js";

const createPriceRule = async (req, res) => {
  try {
    const {
      product,
      collections,
      discount: { _id },
    } = req.body;

    const exitsVolumeDiscount = await VolumeDiscounts.findOne({
      _id,
    });
    if (!exitsVolumeDiscount) throw new Error("Volume not found.");

    // Create Price Rule
    const session = {
      id: "offline_store-21-feb-2023.myshopify.com",
      shop: "store-21-feb-2023.myshopify.com",
      state: "625456374503740",
      isOnline: false,
      scope:
        "write_products,write_assigned_fulfillment_orders,write_draft_orders,write_orders,write_order_edits,write_price_rules",
      accessToken: "shpua_7522990ff5db498b423635c8865bca72",
    };

    const price_rule = new shopify.api.rest.PriceRule({
      session,
    });

    let title = await generateRandomString(10);
    price_rule.title = title;
    price_rule.value_type = "percentage";
    price_rule.value = `-${exitsVolumeDiscount.offer.quantityDiscounts[0].discountType.value}`;
    price_rule.customer_selection = "all";
    price_rule.target_type = "line_item";
    price_rule.target_selection = "entitled";
    price_rule.allocation_method = "each";
    price_rule.starts_at = new Date();
    price_rule.prerequisite_collection_ids = collections;
    price_rule.entitled_product_ids = [product.id];
    price_rule.prerequisite_to_entitlement_quantity_ratio = {
      prerequisite_quantity: null,
      entitled_quantity: null,
    };
    price_rule.allocation_limit = 1;

    console.log("1 Title: ", title);

    await price_rule.save({
      update: true,
    });

    res.status(200).send({ price_rule });
  } catch (error) {
    console.log(error)
    res.status(200).send(error);
  }
};

export default createPriceRule;
