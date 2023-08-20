import { AuthResponse } from "../auth/auth";
import { DbAdapter } from "./DbAdapter";
const uuidv4 = require("uuid/v4");

let userData: any = {};
let store: any = {};

const registerUser = (email: string, password: string) => {
  const newAcessToken = uuidv4();
  userData[email] = {
    password: password,
    token: newAcessToken,
  };
  store[newAcessToken] = {};
  return Promise.resolve();
};

const getTokenForUser = (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    if (!isUserRegistered(email)) {
      resolve({
        success: false,
        error: "Invalid email! Registered?",
      });
    } else if (userData[email] && userData[email].password === password) {
      resolve({
        success: true,
        token: userData[email].token,
      });
    } else {
      resolve({
        success: false,
        error: "Invalid password!",
      });
    }
  });
};

const tokenExists = (token: string) => {
  return Promise.resolve(store.hasOwnProperty(token));
};

const getData = (token: string) => {
  return new Promise((resolve) => {
    if (!tokenExists(token)) {
      resolve(null);
    }
    return resolve(store[token]);
  });
};

const storeData = (token: string, data: any) => {
  store[token] = data;
  return Promise.resolve();
};

const isUserRegistered = (email: string) => {
  return userData.hasOwnProperty(email);
};

export const mockDb: DbAdapter = {
  registerUser,
  getTokenForUser,
  isUserRegistered,
  tokenExists,
  getData,
  storeData,
};
