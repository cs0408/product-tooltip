export const SUCCESS_CODES = {
  // Successful responses (200 – 299)
  default: 200,
};

export const CLIENT_ERROR_CODES = {
  // Client error responses (400 – 499)
  bad_request: 400,
  unauthorized: 401,
  not_found: 404,
  request_timeout: 408,
};

export const SERVER_ERROR_CODES = {
  // Server error responses (500 – 599)
  internal_error: 500,
};
