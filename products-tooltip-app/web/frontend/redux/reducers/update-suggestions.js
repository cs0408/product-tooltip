import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  _filterKey: "",
  _status: "active",
  _products: [],
  _pageInfo: {},
  _productActiveOnModel: {},
};

const updateSuggestionsReducer = createReducer(initialState, {
  UPDATE_PRODUCTS: (state, action) => {
    state._products = action.payload.products;
    state._pageInfo = action.payload.pageInfo;
    state._productActiveOnModel = action.payload.productOnModal || {};
  },
  SET_PRODUCT_FOR_MODEL: (state, action) => {
    state._productActiveOnModel = action.payload || {};
  },
  UPDATE_STATUS: (state, action) => {
    state._status = action.payload;
  },
  UPDATE_FILTER_KEY: (state, action) => {
    state._filterKey = action.payload;
  },
});

export default updateSuggestionsReducer;
