import { configureStore } from "@reduxjs/toolkit";
import createOfferDiscountReducer from "./reducers/create-offer-discount";
import offerPreviewReducers from "./reducers/preview-offer-designing";
import updateSuggestionsReducer from "./reducers/update-suggestions";

const store = configureStore({
  reducer: {
    updateSuggestions: updateSuggestionsReducer,
    createOfferDiscount: createOfferDiscountReducer,
    offerPreviews: offerPreviewReducers,
  },
});

export default store;
