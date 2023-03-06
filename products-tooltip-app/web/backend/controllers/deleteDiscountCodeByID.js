const deleteDiscountCodeByID = async (req, res) => {
  console.log(req.query);
  res.status(200).send({ message: "Discount Code Deleted" });
};

export default deleteDiscountCodeByID;
