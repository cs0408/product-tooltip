import { Button, RadioButton, Stack } from "@shopify/polaris";
import React from "react";
import { useSelector } from "react-redux";
import "./style.css";
import { calculatePercentageAmount } from "../../../../utils";

const VolumePreview = () => {
  // const { offer } = useSelector((states) => states.createOfferDiscount);
  // console.log(offer);
  return (
    // <div style={{ display: "flex", justifyContent: "center", padding: "1px" }}>
    //   {/* <div
    //     style={{
    //       width: "320px",
    //       borderWidth: "1px",
    //       borderStyle: "solid",
    //       borderColor: "red",
    //       padding: "10px",
    //     }}
    //   > */}
    //   <div className="volume-wrapper">
    //     <p>{offer?.offerHeader}</p>

    //     {/* for radio button */}
    //     {offer?.quantityDiscounts?.map((item, index) => {
    //       return (
    //         <>
    //           <input
    //             type="radio"
    //             name="select"
    //             id={item.id}
    //             checked
    //             onChange={() => {}}
    //           />
    //           <label
    //             htmlFor={item.id}
    //             className={`option ${item.id}`}
    //             key={index}
    //           >
    //             <div>
    //               <div>
    //                 <div className="dot"></div>
    //                 <span>{item.customTitle.value}</span>
    //               </div>
    //               <div>
    //                 <p>SAVE 10%OFF</p>
    //                 <span>SAVE 10%OFF</span>
    //                 <span>SAVE 10%OFF</span>
    //               </div>
    //             </div>
    //           </label>
    //         </>
    //       );
    //     })}

    //     {/* <input type="radio" name="select" id="option-1" checked />
    //     <input type="radio" name="select" id="option-2" />
    //     <input type="radio" name="select" id="option-3" />

    //     <label for="option-1" class="option option-1">
    //       <div class="dot"></div>
    //       <span>Student</span>
    //     </label>
    //     <label for="option-2" class="option option-2">
    //       <div class="dot"></div>
    //       <span>Teacher</span>
    //     </label> */}
    //   </div>
    //   {/* {offer?.quantityDiscounts?.map((item, index) => {
    //       console.log(item);
    //       return (
    //         <div
    //           key={index}
    //           style={{
    //             borderWidth: "1px",
    //             borderStyle: "solid",
    //             borderColor: index === 1 ? "green" : "grey",
    //             padding: "5px",
    //             marginTop: "10px",
    //           }}
    //         >
    //           <div>
    //             <div>
    //               <input type="rad" />
    //               <label>{item.customTitle.value}</label>
    //             </div>
    //             <div></div>
    //           </div>
    //         </div>
    //       );
    //     })} */}
    //   {/* <Stack vertical>
    //       <p>{offer_header}</p>
    //       {quantity_discounts.map((item, index) => {
    //         return (
    //           <div
    //             key={index}
    //             style={{
    //               borderWidth: "1px",
    //               borderStyle: "solid",
    //               borderColor: "green",
    //               padding: "5px",
    //             }}
    //           >
    //             <Stack distribution="equalSpacing" alignment="center">
    //               <RadioButton
    //                 label={
    //                   <span style={{ fontSize: "12px" }}>
    //                     {item.custom_text.value}
    //                   </span>
    //                 }
    //                 checked={false}
    //                 id="disabled"
    //                 name="accounts"
    //                 // onChange={handleChange}
    //               />

    //               <span
    //                 style={{
    //                   fontSize: "10px",
    //                   fontWeight: "bold",
    //                   letterSpacing: "1px",
    //                 }}
    //               >
    //                 SAVE{" "}
    //                 {item.discount.suffix === "%"
    //                   ? `${item.discount.value + item.discount.suffix}`
    //                   : `${item.discount.suffix + item.discount.value}`}
    //               </span>
    //             </Stack>
    //             <Stack alignment="trailing" vertical spacing="none">
    //               <p style={{ fontSize: "12px" }}>
    //                 <span style={{ textDecoration: "line-through" }}>
    //                   {item.discount.suffix === "%"
    //                     ? `Rs. ${contant_product_price}`
    //                     : `${item.discount.suffix} ${contant_product_price}`}
    //                 </span>
    //                 <span style={{ marginLeft: "10px" }}>Rs. 42.99</span>
    //               </p>
    //               <p style={{ fontSize: "10px" }}>
    //                 Total{" "}
    //                 <span style={{ textDecoration: "line-through" }}>
    //                   {item.discount.suffix === "%"
    //                     ? `Rs. ${
    //                         Number(contant_product_price) * Number(item.buy)
    //                       }`
    //                     : `${item.discount.suffix} ${
    //                         Number(contant_product_price) * Number(item.buy)
    //                       }`}
    //                 </span>
    //                 <span style={{ marginLeft: "10px" }}>Rs. 42.99</span>
    //               </p>
    //             </Stack>
    //           </div>
    //         );
    //       })}
    //       <Button fullWidth primary>
    //         Grap this deal
    //       </Button>
    //     </Stack> */}
    //   {/* </div> */}
    // </div>
    <>Volume - Preview</>
  );
};

export default VolumePreview;
