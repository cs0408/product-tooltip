import AppError from "../AppError.js";

export default (error, req, res, next) => {
  console.log(error);
  if (error.name === "ReferenceError") {
    return res.status(400).send({
      error: error.message,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      errorCode: error.errorCode,
      error: error.message,
    });
  }

  return res.status(500).send({ error: error.message });
};
