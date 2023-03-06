import React from "react";
import {
  Button,
  Card,
  IndexTable,
  Stack,
  Tag,
  useIndexResourceState,
} from "@shopify/polaris";
import { EditMinor, DeleteMinor } from "@shopify/polaris-icons";
import AntSwitch from "../../components/AntSwitch";
// import DiscountModal from "../../models/DiscountModal";

const AlignmentEndItem = ({ children }) => (
  <p className="align-end-item" style={{ visibility: "hidden" }}>
    {children}
  </p>
);

const AlignmentCenterItem = ({ children }) => (
  <p className="align-center-item">{children}</p>
);

const DashboardSection = () => {
  const customers = [
    {
      id: "3417",
      url: "#",
      name: "Mae Jemison",
      location: "Decatur, USA",
      orders: 20,
      amountSpent: "$2,400",
    },
    {
      id: "2567",
      url: "#",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
      orders: 30,
      amountSpent: "$140",
    },
  ];

  const resourceName = {
    singular: "offer",
    plural: "offers",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);

  const rowMarkup = customers.map(
    ({ id, name, location, orders, amountSpent }, index) => (
      <IndexTable.Row id={id} key={index}>
        <IndexTable.Cell>
          <span>{name}</span>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Stack distribution="center">
            <AntSwitch />
          </Stack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Stack distribution="center">
            <Tag disabled>BUNDLE</Tag>
          </Stack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Stack distribution="trailing">
            <Button icon={EditMinor} accessibilityLabel="Edit Tooltip" />
            <Button icon={DeleteMinor} accessibilityLabel="Edit Tooltip" />
          </Stack>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card
      title={
        <span style={{ fontWeight: "bold", fontSize: "24px" }}>Offers</span>
      }
    >
      <Card.Section fullWidth>
        <IndexTable
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { id: "offer", title: "Offer" },
            {
              id: "active",
              title: <AlignmentCenterItem>Active</AlignmentCenterItem>,
            },
            {
              id: "offer-type",
              title: <AlignmentCenterItem>Offer Type</AlignmentCenterItem>,
            },
            {
              id: "edit-delete",
              title: <AlignmentEndItem>Edit & Delete</AlignmentEndItem>,
            },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </Card.Section>
    </Card>
  );
};

export default DashboardSection;
