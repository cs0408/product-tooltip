import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { useFetch } from "../../../../hooks";

const ProductsList = () => {
  // const dispatch = useDispatch();
  // const {
  //   offer: { apply_offer_on },
  // } = useSelector((states) => states.createOfferDiscount);

  // const [products, setProducts] = useState([]);
  // const { fetchData, data, error, loading } = useFetch(
  //   "/api/products-for-create-discount"
  // );

  // console.log(data);
  // const deselectedOptions = useMemo(
  //   () => [
  //     { value: "rustic", label: "Rustic" },
  //     { value: "antique", label: "Antique" },
  //     { value: "vinyl", label: "Vinyl" },
  //     { value: "vintage", label: "Vintage" },
  //     { value: "refurbished", label: "Refurbished" },
  //   ],
  //   []
  // );

  // const [selectedOptions, setSelectedOptions] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  // const [options, setOptions] = useState(deselectedOptions);

  // const updateText = useCallback(
  //   (value) => {
  //     setInputValue(value);

  //     if (value === "") {
  //       setOptions(deselectedOptions);
  //       return;
  //     }

  //     const filterRegex = new RegExp(value, "i");
  //     const resultOptions = deselectedOptions.filter((option) =>
  //       option.label.match(filterRegex)
  //     );
  //     setOptions(resultOptions);
  //   },
  //   [deselectedOptions]
  // );

  // const updateSelection = useCallback(
  //   (selected) => {
  //     if (selectedOptions.includes(selected)) {
  //       setSelectedOptions(
  //         selectedOptions.filter((option) => option !== selected)
  //       );
  //     } else {
  //       setSelectedOptions([...selectedOptions, selected]);
  //     }

  //     const matchedOption = options.find((option) => {
  //       return option.value.match(selected);
  //     });

  //     updateText("");
  //   },
  //   [options, selectedOptions, updateText]
  // );

  // const removeTag = useCallback(
  //   (tag) => () => {
  //     const options = [...selectedOptions];
  //     options.splice(options.indexOf(tag), 1);
  //     setSelectedOptions(options);
  //   },
  //   [selectedOptions]
  // );

  // const tagsMarkup = selectedOptions.map((option) => (
  //   <Tag key={`option-${option}`} onRemove={removeTag(option)}>
  //     {option}
  //   </Tag>
  // ));

  // const optionsMarkup =
  //   options.length > 0
  //     ? options.map((option) => {
  //         const { label, value } = option;

  //         return (
  //           <Listbox.Option
  //             key={`${value}`}
  //             value={value}
  //             selected={selectedOptions.includes(value)}
  //             accessibilityLabel={label}
  //           >
  //             {label}
  //           </Listbox.Option>
  //         );
  //       })
  //     : null;

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchMinor} />}
            // onChange={updateText}
            labelHidden
            // value={inputValue}
            placeholder="Search products or collections"
          />
        }
      >
        {/* {optionsMarkup ? (
          <Listbox autoSelection="NONE" onSelect={updateSelection}>
            {optionsMarkup}
          </Listbox>
        ) : null} */}
      </Combobox>
    </>
  );
};

const SelectApplyOfferOn = () => {
  const dispatch = useDispatch();
  const { offer } = useSelector((states) => states.createOfferDiscount);

  return (
    <Stack vertical>
      <p style={{ fontWeight: "bold" }}>Apply this offer on</p>

      <FormLayout>
        <ChoiceList
          choices={offer?.applyOfferOn || []}
          selected={offer?.applyOfferOn?.filter((x) => x.status)[0].value || ""}
          onChange={(value) => {
            dispatch({
              type: "UPDATE_VOLUME_APPLY_OFFERS_CHOICE_LIST",
              payload: value[0],
            });
          }}
        />
        {offer?.applyOfferOn?.filter((x) => x.status)[0]?.value !==
          "all-products" && <ProductsList />}
      </FormLayout>
    </Stack>
  );
};

export default memo(SelectApplyOfferOn);
