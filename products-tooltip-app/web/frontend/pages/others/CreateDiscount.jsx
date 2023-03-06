import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SelectOffers from "../../components/discounts/create-discount/SelectOffers";
import SelectedOffer from "../../components/discounts/create-discount/SelectedOffer";
import { useDispatch } from "react-redux";

const CreateDiscount = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch({
      type: "RESET_SELECTED_OFFER_TYPE",
    });
    return () => {
      console.log("main Return");
      dispatch({
        type: "RESET_SELECTED_OFFER_TYPE",
      });
    };
  }, []);

  return <>{searchParams.get("type") ? <SelectedOffer /> : <SelectOffers />}</>;
};

export default CreateDiscount;
