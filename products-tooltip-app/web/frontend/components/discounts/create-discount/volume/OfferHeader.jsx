import React, { memo } from "react";
import { Stack, TextField } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

const OfferHeader = () => {
  const dispatch = useDispatch();
  const { offer } = useSelector((states) => states.createOfferDiscount);
  return (
    <Stack vertical>
      <p style={{ fontWeight: "bold" }}>Offer Header</p>
      <TextField
        labelHidden
        placeholder="Offer Header"
        value={offer?.offerHeader}
        onChange={(value) => {
          dispatch({
            type: "UPDATE_VOLUME_OFFER_HEADER",
            payload: value,
          });
        }}
        autoComplete="off"
      />
    </Stack>
  );
};

export default memo(OfferHeader);
