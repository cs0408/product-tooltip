import shopify from "../../shopify.js";

const deletePriceRuleByID = async (req, res) => {
  try {
    const session = {
      id: "offline_store-21-feb-2023.myshopify.com",
      shop: "store-21-feb-2023.myshopify.com",
      state: "625456374503740",
      isOnline: false,
      scope:
        "write_products,write_assigned_fulfillment_orders,write_draft_orders,write_orders,write_order_edits,write_price_rules",
      accessToken: "shpua_7522990ff5db498b423635c8865bca72",
    };

    await shopify.api.rest.PriceRule.delete({
      session,
      id: req.query.id,
    });

    res.status(200).send({ message: "Price Rule Deleetd." });
  } catch (error) {
    console.log("Error: ", error);
    res.status(200).send({ error: error });
  }
};

export default deletePriceRuleByID;
