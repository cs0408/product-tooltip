import React from "react";
import { Select, TextField } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

const HeaderSection = () => {
  const dispatch = useDispatch();
  const { _filterKey, _status } = useSelector(
    (states) => states.updateSuggestions
  );

  return (
    <div style={{ padding: "16px", display: "flex" }}>
      <div style={{ flex: 1 }}>
        <TextField
          value={_filterKey}
          onChange={(value) =>
            dispatch({ type: "UPDATE_FILTER_KEY", payload: value })
          }
          clearButton
          onClearButtonClick={() =>
            dispatch({ type: "UPDATE_FILTER_KEY", payload: "" })
          }
          autoComplete="off"
          placeholder="Search Product"
        />
      </div>
      <div style={{ paddingLeft: "1rem" }}>
        <Select
          labelInline
          label="Sort by"
          options={[
            { label: "Active", value: "active" },
            { label: "Draft", value: "draft" },
          ]}
          value={_status}
          onChange={(value) =>
            dispatch({ type: "UPDATE_STATUS", payload: value })
          }
        />
      </div>
    </div>
  );
};

export default HeaderSection;
