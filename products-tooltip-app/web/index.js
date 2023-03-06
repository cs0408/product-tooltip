// @ts-check
// import "dotenv";
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";

import tryCatch from "./backend/utils/tryCatch.js";
import errorHandler from "./backend/middlewares/errorHandler.js";
import ShopifyGrapqlClient, {
  PRODUCT_LIST_QUERY,
} from "./backend/graphql/index.js";
import connectDB from "./backend/database/index.js";
import { Stores, TooltipDescriptions } from "./backend/Models/index.js";
import createVoulmeDiscount from "./backend/controllers/create-volume-discount.js";
import getVolumeDiscount from "./backend/controllers/getVolumeDiscount.js";
import createPriceRule from "./backend/controllers/createPriceRule.js";
import createDiscountCode from "./backend/controllers/createDiscountCode.js";
import deletePriceRuleByID from "./backend/controllers/deletePriceRuleByID.js";
import deleteDiscountCodeByID from "./backend/controllers/deleteDiscountCodeByID.js";
import getPriceRuleByID from "./backend/controllers/getPriceRuleByID.js";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
app.use(express.json());

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);

// // Register App API
// app.get("/api/register-app", (req, res) => {
//   console.log("App Installed..333333333333333333333333333333");
// });

app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// Connect DB
connectDB();

// Custom EndPoints for --- Store Front
app.get("/api/store-front/products/tooltips/tooltip?:key", async (req, res) => {
  try {
    const store = await Stores.findOne({
      store: req.headers.origin?.split("https://")[1] || "",
    });

    if (!store) throw new Error("Store not found.");

    const tooltip = await TooltipDescriptions.findOne({
      productID: req.query.key?.includes("gid://shopify/Product/")
        ? req.query.key
        : `gid://shopify/Product/${req.query.key}`,
    });

    res
      .status(200)
      .send(tooltip || { message: "Tooltip Description not available." });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Volume Discount using product ID and product Collections ID
app.post("/api/store-front/discounts/volume", getVolumeDiscount);

// Create Price Rule For Product
app.post("/api/store-front/create-price-rule", createPriceRule);

// Delete Price Rule For Product
app.get("/api/store-front/delete-price-rule?:id", deletePriceRuleByID);

// GET Price Rule For Product
app.get("/api/store-front/get-price-rule?:discountCode", getPriceRuleByID);

// Create Price Rule For Product
app.get("/api/store-front/delete-discount-code?:id", deleteDiscountCodeByID);

// Create Discount Code For Price Rule
app.post("/api/store-front/create-discount-code", createDiscountCode);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

// Custom EndPoints for --- APP
app.get("/api/get-session", (req, res) => {
  res.status(200).send({ session: res.locals.shopify.session });
});

app.get(
  "/api/products",
  tryCatch(async (req, res) => {
    const client = await ShopifyGrapqlClient(res.locals.shopify.session);

    let filterQuery;
    if (req.query.afterNode) {
      // when click on next button
      filterQuery = `first:${5},after:"${req.query.afterNode}"`; // ,query:"title:*${req.query.title}* status:active"
    } else if (req.query.beforeNode) {
      // When click on Prev Button
      filterQuery = `last:${5},before:"${req.query.beforeNode}"`;
    } else {
      // Default call first 10 products
      filterQuery = `first:${5}`;
    }

    await client
      .query({
        data: {
          query: PRODUCT_LIST_QUERY(filterQuery),
        },
      })
      .then(async (data) => {
        // find all products tooltip
        const tooltips = await TooltipDescriptions.find({
          productID: data.body.data.products.edges.map(
            (product) => product.node.id
          ),
        })
          .then((data) => data)
          .catch((err) => []);

        const products = {
          ...data.body.data.products,
          edges: await data.body.data.products.edges.map((product) => {
            return {
              ...product,
              tooltip:
                tooltips.filter(
                  (tooltip) =>
                    tooltip.productID.toString() === product.node.id.toString()
                )[0] || {},
            };
          }),
        };

        res.status(200).send(products);
      })
      .catch((err) => {
        throw new Error("Products Not Found.");
      });
  })
);

app.post(
  "/api/products/product/update?:key",
  tryCatch(async (req, res) => {
    // Find Store
    let store = await Stores.findOne({
      store: res.locals.shopify.session.shop,
    });

    if (!store) {
      throw new Error("Store not found.");
    }

    // Find By Product ID and Update
    await TooltipDescriptions.findOneAndUpdate(
      {
        productID: req.query.key,
        store: store._id,
      },
      {
        $set: { tooltip: req.body.tooltip?.trim() || "" },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .then((data) => {
        res
          .status(200)
          .send({ ...data._doc, message: "Tooltip Description Updated." });
      })
      .catch((error) => {
        throw new Error("Tooltip Description not updated.");
      });
  })
);

app.get(
  "/api/products-with-variants",
  tryCatch((req, res) => {
    res.status(200).send({ products: [] });
  })
);

// Create Discounts
app.post(
  "/api/discounts/create",
  tryCatch(async (req, res) => {
    switch (req.body.selectedOffer.offerID) {
      case "bundle_discount":
        res.status(200).send({ type: req.body.offer_type });
        break;

      case "volume_discount":
        var response = await createVoulmeDiscount({
          body: req.body,
          session: res.locals.shopify.session,
        });
        res.status(200).send(response);
        break;

      case "mix_and_macth_discount":
        res.status(200).send({ type: req.body.offer_type });
        break;
      case "cart_goal_discount":
        res.status(200).send({ type: req.body.offer_type });
        break;

      default:
        throw new Error("Discount type is required parameter.");
    }
  })
);

// Custom Middlewares
app.use(errorHandler);

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
