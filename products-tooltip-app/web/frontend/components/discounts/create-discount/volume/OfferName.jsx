import React, { memo } from "react";
import { Stack, TextField } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

const OfferName = () => {
  const dispatch = useDispatch();
  const { offer } = useSelector((states) => states.createOfferDiscount);

  return (
    <Stack vertical>
      <p style={{ fontWeight: "bold" }}>Offer Name</p>
      <TextField
        labelHidden
        placeholder="Offer #1"
        value={offer?.offerName}
        onChange={(value) => {
          dispatch({
            type: "UPDATE_VOLUME_OFFER_NAME",
            payload: value,
          });
        }}
        autoComplete="off"
      />
    </Stack>
  );
};

export default memo(OfferName);
