import { DeliveryMethod } from "@shopify/shopify-api";

export default {
  // These three mandatory webhooks: customers/data_request, customers/redact, shop/redact
  /**
   * Customers can request their data from a store owner. When this happens,
   * Shopify invokes this webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
   */
  CUSTOMERS_DATA_REQUEST: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log(
        "------------ Webhook : Customers Data Request --------------------"
      );
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  /**
   * Store owners can request that data is deleted on behalf of a customer. When
   * this happens, Shopify invokes this webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-redact
   */
  CUSTOMERS_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log(
        "------------- Webhook : Customers Redact-------------------"
      );
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  /**
   * 48 hours after a store owner uninstalls your app, Shopify invokes this
   * webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#shop-redact
   */
  SHOP_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("------------ Webhook : Shop Redact --------------------");
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  // Product Create - success
  PRODUCTS_CREATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("------------- Webhook : Product Create -------------------");
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  // Product Delete - success
  PRODUCTS_DELETE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("-------------- Webhook : Product Delete ------------------");
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  // Orders Create - Succes
  ORDERS_CREATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("------------ Webhook : Orders Create --------------------");
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  // Orders Delete - Success
  ORDERS_DELETE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("----------- Webhook : Orders Delete ---------------------");
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  // Orders Fullfiled - Succes
  ORDERS_FULFILLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("------------ Webhhok : Orders Fulfilled ------------");
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  // Orders Paid - Succes
  ORDERS_PAID: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      console.log("---------- Webhook : Orders Paid ---------------");
      console.log({
        topic,
        shop,
        webhookId,
      });
      console.log(payload);
    },
  },

  // // APP Installed -
  // APP_INSTALLED: {
  //   deliveryMethod: DeliveryMethod.Http,
  //   callbackUrl: "/api/webhooks",
  //   callback: async (topic, shop, body, webhookId) => {
  //     const payload = JSON.parse(body);
  //     console.log("---------- Webhook : App Installed ---------------");
  //     console.log({
  //       topic,
  //       shop,
  //       webhookId,
  //     });
  //     console.log(payload);
  //   },
  // },
};
