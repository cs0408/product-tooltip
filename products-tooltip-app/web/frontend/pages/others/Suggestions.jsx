import React, { useEffect } from "react";
import { Card, Page } from "@shopify/polaris";
import { useFetch } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  SuggestionBody,
  SuggestionHeader,
  SuggestionsFooter,
} from "../../sections/suggestions";

const Suggestions = () => {
  const dispatch = useDispatch();

  const { fetchData, loading, data, error } = useFetch(); // fetch data hook
  const { _filterKey, _products } = useSelector(
    (states) => states.updateSuggestions
  );

  // Get Products
  const GET_PRODUCTS_Function = {
    DEFAULT: () => {
      fetchData(`/api/products?title=${_filterKey}`);
    },
    NEXT_PRODUCTS: () => {
      fetchData(
        `/api/products?title=${_filterKey}&afterNode=${
          (_products && _products[_products.length - 1]?.cursor) || ""
        }`
      );
    },
    PREV_PRODUCTS: () => {
      fetchData(
        `/api/products?title=${_filterKey}&beforeNode=${
          (_products && _products[0]?.cursor) || ""
        }`
      );
    },
  };

  // Hooks
  useEffect(() => {
    GET_PRODUCTS_Function.DEFAULT();
  }, [_filterKey]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "UPDATE_PRODUCTS",
        payload: {
          products: data.edges,
          pageInfo: data.pageInfo,
        },
      });
    }
  }, [data, error]);

  return (
    <Page title="Update Product Tooltip Suggestions">
      <Card>
        <SuggestionHeader />
        <SuggestionBody loading={loading} error={error} />
        <SuggestionsFooter
          prevButton={GET_PRODUCTS_Function.PREV_PRODUCTS}
          nextButton={GET_PRODUCTS_Function.NEXT_PRODUCTS}
        />
      </Card>
    </Page>
  );
};

export default Suggestions;
