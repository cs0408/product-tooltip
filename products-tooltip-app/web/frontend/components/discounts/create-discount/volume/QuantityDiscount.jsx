import React, { memo } from "react";
import { Button, Checkbox, Select, Stack, TextField } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

const QuantityDiscount = () => {
  const dispatch = useDispatch();
  const { offer } = useSelector((states) => states.createOfferDiscount);

  const options = [
    { label: "% off", value: "percent-off", sufixx: "%" },
    { label: "Rs. off", value: "inr-off", prefixx: "Rs." },
  ];

  return (
    <Stack vertical>
      <p style={{ fontWeight: "bold" }}>Quantity discounts</p>

      <Stack vertical>
        {offer?.quantityDiscounts?.map((option, index) => {
          const id = `option-${index + 1}`;
          return (
            <div
              key={index}
              style={{
                border: "1px solid #c8d0d8",
                borderRadius: "3px",
                padding: "1rem 1.5rem",
              }}
            >
              <Stack vertical>
                <Stack>
                  <span>Option #{index + 1}</span>
                  <span>Buy</span>
                  <div>
                    <TextField
                      type="number"
                      value={option.buy}
                      onChange={(value) => {
                        dispatch({
                          type: "UPDATE_VOLUME_QUANTITY_DISCOUNT_BUY_OPTION",
                          payload: { id, value },
                        });
                      }}
                      autoComplete="off"
                      labelHidden
                    />
                  </div>
                  {option.buyUpTo.status && (
                    <>
                      <span>-</span>
                      <TextField
                        type="number"
                        value={option.buyUpTo.value}
                        onChange={(value) => {
                          dispatch({
                            type: "UPDATE_VOLUME_QUANTITY_DISCOUNT_BUY_UPTO_OPTION",
                            payload: { id, value },
                          });
                        }}
                        autoComplete="off"
                        labelHidden
                      />
                    </>
                  )}
                  <span>for</span>
                  <Stack spacing="none">
                    <TextField
                      type="number"
                      value={option.discountType.value}
                      onChange={(value) => {
                        dispatch({
                          type: "UPDATE_VOLUME_QUANTITY_DISCOUNT_OPTION_DISCOUNT",
                          payload: { id, value },
                        });
                      }}
                      autoComplete="off"
                      labelHidden
                    />
                    <Select
                      options={options}
                      onChange={(value) => {
                        dispatch({
                          type: "UPDATE_VOLUME_QUANTITY_DISCOUNT_ENABLE_OPTION_DISCOUNT",
                          payload: {
                            id,
                            discount: {
                              ...options.filter((x) => x.value === value)[0],
                              id: value,
                              value: option.discountType.value,
                            },
                          },
                        });
                      }}
                      value={option.discountType.id}
                    />
                  </Stack>
                </Stack>
                <Stack spacing="none" vertical>
                  <Checkbox
                    label="Add Range"
                    checked={option.buyUpTo.status}
                    onChange={(value) => {
                      dispatch({
                        type: "UPDATE_VOLUME_QUANTITY_DISCOUNT_ENABLE_BUY_UPTO_OPTION",
                        payload: { id, value },
                      });
                    }}
                  />
                  <Checkbox
                    label="Context Text"
                    checked={option.customTitle.status}
                    onChange={(value) => {
                      dispatch({
                        type: "UPDATE_VOLUME_QUANTITY_DISCOUNT_ENABLE_CUSTOM_TILTE_OPTION",
                        payload: { id, value },
                      });
                    }}
                  />
                </Stack>
                {option.customTitle.status && (
                  <TextField
                    type="text"
                    value={option.customTitle.value}
                    onChange={(value) => {
                      dispatch({
                        type: "UPDATE_VOLUME_QUANTITY_DISCOUNT_CUSTOM_TILTE_OPTION",
                        payload: { id, value },
                      });
                    }}
                    autoComplete="off"
                    labelHidden
                  />
                )}
              </Stack>
            </div>
          );
        })}
        <Button
          onClick={() => {
            dispatch({
              type: "UPDATE_VOLUME_QUANTITY_DISCOUNT_ADD_OPTION",
            });
          }}
        >
          Add Option
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(QuantityDiscount);
