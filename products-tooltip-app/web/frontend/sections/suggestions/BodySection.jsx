import React from "react";
import {
  Button,
  IndexTable,
  Stack,
  Thumbnail,
  useIndexResourceState,
} from "@shopify/polaris";
import { EditMinor, ImageMajor } from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";
import ToastAlert from "../../components/ToastAlert";
import UpdateTooltipModal from "../../models/UpdateTooltipModal";

const BodySection = ({ loading, error }) => {
  const dispatch = useDispatch();
  const { _products } = useSelector((states) => states.updateSuggestions);

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(_products || []);

  return (
    <>
      {error && <ToastAlert content={"Somethings wrong. Try again later."} />}
      <IndexTable
        loading={loading}
        resourceName={resourceName}
        itemCount={_products?.length || 0}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Title" },
          { title: "Tooltip Description" },
          { title: "" },
        ]}
        selectable={false}
      >
        {_products?.map(
          ({ node: { id, title, images }, tooltip: { tooltip } }, index) => (
            <IndexTable.Row
              id={id}
              key={id}
              selected={selectedResources.includes(id)}
              position={index}
            >
              <IndexTable.Cell>
                <Stack alignment="center">
                  <Thumbnail
                    size="small"
                    source={images.edges[0]?.node.url || ImageMajor}
                  />
                  <span>{title}</span>
                </Stack>
              </IndexTable.Cell>
              <IndexTable.Cell>{tooltip || "-"}</IndexTable.Cell>
              <IndexTable.Cell>
                <UpdateTooltipModal>
                  <Button
                    icon={EditMinor}
                    accessibilityLabel="Edit Tooltip"
                    onClick={() =>
                      dispatch({
                        type: "SET_PRODUCT_FOR_MODEL",
                        payload: _products?.filter(
                          (product) => product.node.id === id
                        )[0],
                      })
                    }
                  />
                </UpdateTooltipModal>
              </IndexTable.Cell>
            </IndexTable.Row>
          )
        ) || []}
      </IndexTable>
    </>
  );
};

export default BodySection;
