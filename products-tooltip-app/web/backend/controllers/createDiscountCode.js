import shopify from "../../shopify.js";

const createDiscountCode = async (req, res) => {
  try {
    const { id: priceRuleID, title } = req.body.priceRule;

    // Create Discount Code For Price Rule
    const session = {
      id: "offline_store-21-feb-2023.myshopify.com",
      shop: "store-21-feb-2023.myshopify.com",
      state: "625456374503740",
      isOnline: false,
      scope:
        "write_products,write_assigned_fulfillment_orders,write_draft_orders,write_orders,write_order_edits,write_price_rules",
      accessToken: "shpua_7522990ff5db498b423635c8865bca72",
    };

    const discount_code = new shopify.api.rest.DiscountCode({
      session,
    });

    discount_code.price_rule_id = priceRuleID;
    discount_code.code = title;

    await discount_code.save({
      update: true,
    });

    res.status(200).send(discount_code);
  } catch (error) {
    console.log("error: ", error);
    res.status(200).send({ error: error });
  }
};

export default createDiscountCode;
