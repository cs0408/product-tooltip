import React from "react";
import { Button, Stack } from "@shopify/polaris";
import {
  VolumeDiscountForm,
  VolumeDiscountPreview,
} from "../sections/volume-discount";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";

const VolumeDiscount = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ padding: "20px 20px 0px" }}>
        <Stack alignment="center" distribution="equalSpacing">
          <Stack alignment="center">
            <Button
              icon={MobileBackArrowMajor}
              onClick={() => navigate("/discounts")}
            />
            <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
              Volume Discount
            </span>
          </Stack>
          <Stack alignment="center">
            <Button>Cancel</Button>
            <Button primary>Publish</Button>
          </Stack>
        </Stack>
      </div>
      <div style={{ margin: "10px 0px" }}>
        <hr />
      </div>
      {/* Body */}
      <div
        style={{
          height: "100%",
          display: "flex",
          flex: 1,
        }}
      >
        <VolumeDiscountForm />
        <VolumeDiscountPreview />
      </div>
    </div>
  );
};

export default VolumeDiscount;
