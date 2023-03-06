import { Stack } from "@shopify/polaris";
import React from "react";
import AdvanceSettings from "./AdvanceSettings";
import OfferHeader from "./OfferHeader";
import OfferName from "./OfferName";
import QuantityDiscount from "./QuantityDiscount";
import SelectApplyOfferOn from "./SelectApplyOfferOn";

const VolumeDiscount = () => {
  return (
    <Stack vertical>
      <OfferName />
      <hr />
      <SelectApplyOfferOn />
      <hr />
      <OfferHeader />
      <hr />
      <QuantityDiscount />
      {/* <hr />
      <AdvanceSettings /> */}
    </Stack>
  );
};

export default VolumeDiscount;
