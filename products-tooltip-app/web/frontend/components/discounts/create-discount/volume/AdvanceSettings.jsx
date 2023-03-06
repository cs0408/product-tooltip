import React, { memo, useCallback, useMemo, useState } from "react";
import {
  ChoiceList,
  Combobox,
  FormLayout,
  Icon,
  Listbox,
  Stack,
  Tag,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";

const AdvanceSettings = () => {
  return (
    <Stack vertical>
      <p style={{ fontWeight: "bold" }}>Advanced settings</p>
    </Stack>
  );
};

export default memo(AdvanceSettings);
