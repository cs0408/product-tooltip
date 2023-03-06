import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  Thumbnail,
  Stack,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { useFetch } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { ImageMajor } from "@shopify/polaris-icons";
import ToastAlert from "../components/ToastAlert";

const ModalContainer = ({ active, handleModalChange }) => {
  const dispatch = useDispatch();

  const { _productActiveOnModel, _products, _pageInfo } = useSelector(
    (states) => states.updateSuggestions
  );

  const { fetchData, loading, data, error } = useFetch();

  const updateProduct = () => {
    fetchData(
      `/api/products/product/update?key=${_productActiveOnModel?.node?.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tooltip: _productActiveOnModel?.tooltip?.tooltip,
        }),
      }
    );
  };

  useEffect(() => {
    return () => dispatch({ type: "SET_PRODUCT_FOR_MODEL" });
  }, []);

  useEffect(() => {
    if (data) {
      // Update States
      dispatch({
        type: "UPDATE_PRODUCTS",
        payload: {
          products: _products?.map((product) => {
            if (product.node.id === data.productID) {
              return {
                ...product,
                tooltip: {
                  ...product.tooltip,
                  tooltip: data.tooltip,
                },
              };
            } else {
              return product;
            }
          }),
          pageInfo: _pageInfo,
          productOnModal: _productActiveOnModel?.node.id === data.productID && {
            ..._productActiveOnModel,
            tooltip: {
              ..._productActiveOnModel.tooltip,
              tooltip: data.tooltip,
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <>
      {error && <ToastAlert content={error.error} />}
      {data && <ToastAlert content={data.message} />}
      <Modal
        open={active}
        onClose={handleModalChange}
        title="Update Tooltip"
        primaryAction={{
          content: "Update",
          onAction: updateProduct,
          loading: loading,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleModalChange,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical alignment="center">
            <Thumbnail
              size="large"
              source={
                _productActiveOnModel?.node?.images?.edges[0]?.node.url ||
                ImageMajor
              }
            />
            <FormLayout>
              <TextField
                value={_productActiveOnModel?.node?.title}
                disabled
                label="Title"
                type="text"
              />
              <TextField
                multiline={4}
                maxHeight={100}
                value={_productActiveOnModel?.tooltip?.tooltip}
                onChange={(value) => {
                  dispatch({
                    type: "SET_PRODUCT_FOR_MODEL",
                    payload: {
                      ..._productActiveOnModel,
                      node: {
                        ..._productActiveOnModel.node,
                      },
                      tooltip: {
                        ..._productActiveOnModel.tooltip,
                        tooltip: value,
                      },
                    },
                  });
                }}
                label="Tooltip"
                type="text"
              />
            </FormLayout>
          </Stack>
        </Modal.Section>
      </Modal>
    </>
  );
};

const UpdateTooltipModal = ({ children }) => {
  const [active, setActive] = useState(false);

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  return (
    <>
      <span onClick={handleModalChange}>{children}</span>
      {active && (
        <ModalContainer active={active} handleModalChange={handleModalChange} />
      )}
    </>
  );
};

export default UpdateTooltipModal;
