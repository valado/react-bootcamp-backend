const validator = require("email-validator");

import { Credentials } from "./model/Credentials";

export const getAuthHeader = (headers: any): string | null => {
  console.log(headers);
  if (headers.hasOwnProperty("authorization")) {
    return headers.authorization;
  } else {
    return null;
  }
};

export const extractToken = (authHeader: string) =>
  authHeader?.replace("Bearer ", "") || "";

export const extractCredentials = (token: string): Credentials | null => {
  token = token.replace("Basic ", "");
  console.log(token);
  const items = token.split(":");
  if (items.length !== 2) {
    return null;
  }
  const email = items[0];
  const password = items[1];
  if (!validator.validate(email)) {
    return null;
  }
  return { email, password };
};
