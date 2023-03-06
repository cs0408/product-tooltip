import shopify from "../../shopify.js";

export const PRODUCT_LIST_QUERY = (filter) => `
{
    products(${filter}) {
        pageInfo {
            hasNextPage
            hasPreviousPage
        }
        edges {
            cursor
            node {
                id
                title
                images(first: 1) {
                    edges {
                      node {
                        id
                        url
                      }
                    }
                  }
            }
        }
    }
}
`;

export const GET_PRODUCT_BY_ID_QUERY = (productID) => `
{
  product(id:"${productID}") {
    id
    title
    images(first: 1) {
      edges {
        node {
          id
          url
        }
      }
    }
  }
}
`;

const ShopifyGrapqlClient = async (session) =>
  new shopify.api.clients.Graphql({ session });

export default ShopifyGrapqlClient;
