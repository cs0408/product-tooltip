import React from "react";
import { Pagination } from "@shopify/polaris";
import { useSelector } from "react-redux";

const FooterSection = ({ prevButton, nextButton }) => {
  const { _pageInfo } = useSelector((states) => states.updateSuggestions);
  // const { fetchData, data } = useFetch("/api/get-session");
  // console.log(data);
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pagination
        label={`Showing ${10} of ${100} results`}
        hasPrevious={_pageInfo.hasPreviousPage || false}
        hasNext={_pageInfo.hasNextPage || false}
        onPrevious={prevButton}
        onNext={nextButton}
      />
    </div>
  );
};

export default FooterSection;
