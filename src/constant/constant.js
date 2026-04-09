export const CONFIG = {
  JWT: {
    SECRET: "tokenSecretkey",
    EXPIRES_IN: 86400,
    EXPIRE_TOKEN_ERROR: "TokenExpiredError: jwt expired",
    INVALID_TOKEN_ERROR: "JsonWebTokenError: invalid token",
    INVALID_SIGNATURE_ERROR: "JsonWebTokenError: invalid signature",
    JSON_WEB_TOKEN_ERROR: "JsonWebTokenError: jwt must be provided",
  },

  ADMIN_ID: {
    ID: "b883f803-661e-42f3-97b2-f39efbcef845",
  },
  DATA_LIMIT: 10,
};
