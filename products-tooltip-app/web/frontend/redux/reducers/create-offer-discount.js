import { createReducer } from "@reduxjs/toolkit";

const _initialStates = {
  offerTypes: [
    {
      status: false,
      offerID: "bundle_discount",
      title: "Bundle Discount",
      features: [
        "Offer a discount when buying a group of complimentary products.",
        "Example: Buy X get Y, Buy X+Y get 20% off.",
      ],
    },
    {
      status: false,
      offerID: "volume_discount",
      title: "Volume Discount",
      features: [
        "Offer a discount when customers add more of the same product.",
        "Example: Buy 3 and get 20% off.",
      ],
      tempProductPrice: 43.99,
    },
    {
      status: false,
      offerID: "mix_and_macth_discount",
      title: "Mix and Match Discount",
      features: [
        "Offer a discount when customers buy different products.",
        "Example: Buy any 3 t-shirts and get 30% off.",
      ],
    },
    {
      status: false,
      offerID: "cart_goal_discount",
      title: "Cart Goal Discount",
      features: [
        "Offer a discount when customers reach specific cart values.",
        "For example: spend X to get Y off.",
      ],
    },
  ],
};

const _volumeDiscount = {
  active: true,
  offerName: "Offer #1",
  offerHeader: "Buy more and save",
  applyOfferOn: [
    {
      status: true,
      ids: [],
      label: "All Products",
      value: "all-products",
    },
    {
      status: false,
      ids: [],
      label: "Specific Products",
      value: "specific-products",
    },
    {
      status: false,
      ids: [],
      label: "Specific Collections",
      value: "specific-collections",
    },
  ],
  quantityDiscounts: [
    {
      id: "option-1",
      label: "Option #1",
      customTitle: {
        status: false,
        value: "Buy 2 and save 10% off",
      },
      buy: 2,
      buyUpTo: {
        status: false,
        value: 3,
      },
      discountType: {
        id: "percent-off",
        value: 10,
        suffix: "%",
      },
    },
  ],
};

const createOfferDiscountReducer = createReducer(_initialStates, {
  SET_SELECTED_OFFER_TYPE: (state, action) => {
    const offerIndex = state.offerTypes.findIndex(
      (x) => x.offerID === action.payload
    );

    if (offerIndex > -1) {
      state.offerTypes[offerIndex].status = true;
      state.selectedOffer = state.offerTypes[offerIndex];

      switch (action.payload) {
        case "bundle_discount":
          state.offer = {};
          break;

        case "volume_discount":
          state.offer = _volumeDiscount;
          break;

        case "mix_and_macth_discount":
          state.offer = {};
          break;

        case "cart_goal_discount":
          state.offer = {};
          break;

        default:
          break;
      }
    }
  },
  RESET_SELECTED_OFFER_TYPE: (state) => {
    for (var i = 0; i < state.offerTypes.length; i++) {
      state.offerTypes[i].status = false;
      state.offer = {};
      state.selectedOffer = {};
    }
  },
  // Manage Volume Offer Details
  UPDATE_VOLUME_OFFER_NAME: (state, action) => {
    state.offer.offerName = action.payload;
  },
  UPDATE_VOLUME_APPLY_OFFERS_CHOICE_LIST: (state, action) => {
    state.offer.applyOfferOn.map((x, index) => {
      if (x.value === action.payload) {
        state.offer.applyOfferOn[index].status = true;
        state.offer.applyOfferOn[index].ids = [];
      } else {
        state.offer.applyOfferOn[index].status = false;
        state.offer.applyOfferOn[index].ids = [];
      }
    });
  },
  UPDATE_VOLUME_OFFER_HEADER: (state, action) => {
    state.offer.offerHeader = action.payload;
  },
  UPDATE_VOLUME_QUANTITY_DISCOUNT_BUY_OPTION: (state, action) => {
    const optionIndex = state.offer.quantityDiscounts.findIndex(
      (x) => x.id === action.payload.id
    );
    if (optionIndex > -1) {
      state.offer.quantityDiscounts[optionIndex].buy = action.payload.value;
    }
  },
  UPDATE_VOLUME_QUANTITY_DISCOUNT_BUY_UPTO_OPTION: (state, action) => {
    const optionIndex = state.offer.quantityDiscounts.findIndex(
      (x) => x.id === action.payload.id
    );
    if (optionIndex > -1) {
      state.offer.quantityDiscounts[optionIndex].buyUpTo.value =
        action.payload.value;
    }
  },
  UPDATE_VOLUME_QUANTITY_DISCOUNT_ENABLE_BUY_UPTO_OPTION: (state, action) => {
    const optionIndex = state.offer.quantityDiscounts.findIndex(
      (x) => x.id === action.payload.id
    );
    if (optionIndex > -1) {
      state.offer.quantityDiscounts[optionIndex].buyUpTo.status =
        action.payload.value;
    }
  },
  UPDATE_VOLUME_QUANTITY_DISCOUNT_OPTION_DISCOUNT: (state, action) => {
    const optionIndex = state.offer.quantityDiscounts.findIndex(
      (x) => x.id === action.payload.id
    );
    if (optionIndex > -1) {
      state.offer.quantityDiscounts[optionIndex].discountType.value =
        action.payload.value;
    }
  },
  UPDATE_VOLUME_QUANTITY_DISCOUNT_ENABLE_OPTION_DISCOUNT: (state, action) => {
    const optionIndex = state.offer.quantityDiscounts.findIndex(
      (x) => x.id === action.payload.id
    );
    if (optionIndex > -1) {
      state.offer.quantityDiscounts[optionIndex].discountType =
        action.payload.discount;
    }
  },
  UPDATE_VOLUME_QUANTITY_DISCOUNT_CUSTOM_TILTE_OPTION: (state, action) => {
    const optionIndex = state.offer.quantityDiscounts.findIndex(
      (x) => x.id === action.payload.id
    );
    if (optionIndex > -1) {
      state.offer.quantityDiscounts[optionIndex].customTitle.value =
        action.payload.value;
    }
  },
  UPDATE_VOLUME_QUANTITY_DISCOUNT_ENABLE_CUSTOM_TILTE_OPTION: (
    state,
    action
  ) => {
    const optionIndex = state.offer.quantityDiscounts.findIndex(
      (x) => x.id === action.payload.id
    );
    if (optionIndex > -1) {
      state.offer.quantityDiscounts[optionIndex].customTitle.status =
        action.payload.value;
    }
  },
  UPDATE_VOLUME_QUANTITY_DISCOUNT_ADD_OPTION: (state, action) => {
    state.offer.quantityDiscounts.push({
      id: `option-${state.offer.quantityDiscounts.length + 1}`,
      label: `Option #${state.offer.quantityDiscounts.length + 1}`,
      customTitle: {
        status: false,
        value: "Buy 3 and save 15% off",
      },
      buy: 3,
      buyUpTo: {
        status: false,
        value: 4,
      },
      discountType: {
        id: "percent-off",
        value: 10,
        suffix: "%",
      },
    });
  },
});

export default createOfferDiscountReducer;
