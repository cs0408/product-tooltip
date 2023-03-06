import { Banner, Page, Stack } from "@shopify/polaris";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SelectOffers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { offerTypes } = useSelector((states) => states.createOfferDiscount);

  return (
    <Page
      breadcrumbs={[{ content: "Back", url: "/discounts" }]}
      title="Select Offer Type"
      narrowWidth
    >
      <br />
      <Stack vertical>
        {offerTypes.map((item, index) => (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch({
                type: "SET_SELECTED_OFFER_TYPE",
                payload: item.offerID,
              });
              navigate(window.location.pathname + `?type=${item.offerID}`);
            }}
          >
            <Banner title={item.title} status={item.status && "success"}>
              {item.features.map((subItem, subIndex) => (
                <p key={subIndex}>{subItem}</p>
              ))}
            </Banner>
          </div>
        ))}
      </Stack>
    </Page>
  );
};

export default SelectOffers;
