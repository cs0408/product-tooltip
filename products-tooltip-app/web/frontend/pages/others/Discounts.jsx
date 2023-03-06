import React, { useCallback, useState } from "react";
import { Page, Button, Tabs } from "@shopify/polaris";
import {
  PageDiscountsDashboard,
  PageDiscountsDesign,
} from "../../sections/discounts";
import { useNavigate } from "react-router-dom";

const Discounts = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "dashboard",
      content: "Dashboard",
      component: <PageDiscountsDashboard />,
    },
    {
      id: "design",
      content: "Design",
      component: <PageDiscountsDesign />,
    },
  ];

  return (
    <Page
      fullWidth
      breadcrumbs={[{ content: "Home", url: "/" }]}
      title="Manage Discounts"
      primaryAction={
        <Button
          primary
          onClick={() => navigate(window.location.pathname + "/offer-create")}
        >
          Create Discount
        </Button>
      }
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />
      <br />
      {tabs[selected].component}
    </Page>
  );
};

export default Discounts;
