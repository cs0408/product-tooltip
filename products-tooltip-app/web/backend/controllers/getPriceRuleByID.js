import shopify from "../../shopify.js";

const getPriceRuleByID = async (req, res) => {
  const { discountCode } = req.query;

  const session = {
    id: "offline_store-21-feb-2023.myshopify.com",
    shop: "store-21-feb-2023.myshopify.com",
    state: "625456374503740",
    isOnline: false,
    scope:
      "write_products,write_assigned_fulfillment_orders,write_draft_orders,write_orders,write_order_edits,write_price_rules",
    accessToken: "shpua_7522990ff5db498b423635c8865bca72",
  };

  const price_rule = await shopify.api.rest.PriceRule.find({
    session,
    title: discountCode,
  });

  res.status(200).send(price_rule);
};

export default getPriceRuleByID;
