import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button, Icon, Stack } from "@shopify/polaris";
import { ChevronLeftMinor } from "@shopify/polaris-icons";
import BundleDiscount from "./bundle";
import VolumeDiscount from "./volume";
import MixMatchDiscount from "./mix-match";
import CartGoalDiscount from "./cart-goal";
import BundlePreview from "../previews/bundle";
import VolumePreview from "../previews/volume";
import MixMatchPreview from "../previews/mix-match";
import CartGoalPreview from "../previews/cart-goal";
import { useFetch } from "../../../hooks";

const SubmitFormButton = () => {
  const datas = useSelector((states) => states.createOfferDiscount);

  const { fetchData, data, error, loading } = useFetch();
  const saveDiscount = () => {
    fetchData("/api/discounts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });
  };

  console.log(data, loading, error);
  return (
    <Button size="slim" primary onClick={saveDiscount} loading={loading}>
      Save
    </Button>
  );
};
const DiscountPageHeader = () => {
  const { selectedOffer } = useSelector((states) => states.createOfferDiscount);

  return (
    <div style={{ padding: "20px 20px 10px 20px" }}>
      <Stack distribution="equalSpacing" alignment="center">
        <span style={{ fontWeight: "bold", fontSize: "24px" }}>
          {selectedOffer?.title}
        </span>
        <Stack>
          <Button
            size="slim"
            onClick={() => navigate(window.location.pathname)}
          >
            Cancel
          </Button>
          <SubmitFormButton />
        </Stack>
      </Stack>
    </div>
  );
};

const DiscountTypeForm = () => {
  const [searchParams] = useSearchParams();

  switch (searchParams.get("type")) {
    case "bundle_discount":
      return <BundleDiscount />;
    case "volume_discount":
      return <VolumeDiscount />;
    case "mix_and_macth_discount":
      return <MixMatchDiscount />;
    case "cart_goal_discount":
      return <CartGoalDiscount />;

    default:
      return <></>;
  }
};

const DiscountTypePreview = () => {
  const [searchParams] = useSearchParams();

  switch (searchParams.get("type")) {
    case "bundle_discount":
      return <BundlePreview />;
    case "volume_discount":
      return <VolumePreview />;
    case "mix_and_macth_discount":
      return <MixMatchPreview />;
    case "cart_goal_discount":
      return <CartGoalPreview />;

    default:
      return <></>;
  }
};

const SelectedOffer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { offerTypes } = useSelector((states) => states.createOfferDiscount);

  useEffect(() => {
    const offer_type =
      offerTypes.filter((x) => x.offerID === searchParams.get("type"))[0] ||
      undefined;

    if (!offer_type || !offer_type.status) {
      navigate(window.location.pathname);
    }

    return () => {
      dispatch({ type: "RESET_SELECTED_OFFER_TYPE" });
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DiscountPageHeader />

      <div style={{ width: "fit-content", padding: "0px 0px 20px 20px" }}>
        <Link to={window.location.pathname}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon source={ChevronLeftMinor} color="base" backdrop />
            <span style={{ marginLeft: "5px" }}>Back to Offer type</span>
          </div>
        </Link>
      </div>

      <hr style={{ borderTop: "20px", margin: "0px 0px 20px 0px" }} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          overflow: "auto",
          paddingLeft: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "100%",
            overflow: "auto",
            padding: "20px",
            backgroundColor: "white",
          }}
        >
          {/* Form */}
          <DiscountTypeForm />
        </div>

        {/* Preview */}
        <div
          style={{
            flex: 1,
            height: "100%",
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>Preview</p>
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <DiscountTypePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedOffer;
