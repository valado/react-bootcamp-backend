const uuidv4 = require("uuid/v4");

let userData: any = {};
let store: any = {};

export const isUserRegistered = (email: string) => {
  return userData.hasOwnProperty(email);
};

export const registerUser = (email: string, pass: string) => {
  const newAcessToken = uuidv4();
  userData[email] = {
    pass: pass,
    token: newAcessToken,
  };
  store[newAcessToken] = {};
};

export const getTokenForUser = (email: string, pass: string) => {
  if (!isUserRegistered(email)) {
    return {
      success: false,
      data: "Invalid email!",
    };
  } else if (userData[email] && userData[email].pass === pass) {
    return {
      success: true,
      data: userData[email].token,
    };
  } else {
    return {
      success: false,
      data: "Invalid password!",
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
