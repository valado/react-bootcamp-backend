import { AuthResponse } from "./auth/auth";
const uuidv4 = require("uuid/v4");

let userData: any = {};
let store: any = {};

export const isUserRegistered = (email: string) => {
  return userData.hasOwnProperty(email);
};

export const registerUser = (email: string, password: string) => {
  const newAcessToken = uuidv4();
  userData[email] = {
    password: password,
    token: newAcessToken,
  };
  store[newAcessToken] = {};
};

export const getTokenForUser = (
  email: string,
  password: string
): AuthResponse => {
  if (!isUserRegistered(email)) {
    return {
      success: false,
      error: "Invalid email! Registered?",
    };
  } else if (userData[email] && userData[email].password === password) {
    return {
      success: true,
      token: userData[email].token,
    };
  } else {
    return {
      success: false,
      error: "Invalid password!",
    };
  }
};

export const tokenExists = (token: string) => {
  return store.hasOwnProperty(token);
};

export const getData = (token: string) => {
  if (!tokenExists(token)) {
    return null;
  }
  return store[token];
};

export const storeData = (token: string, data: any) => {
  store[token] = data;
};

export const clearDB = () => {
  userData = {};
  store = {};
};
