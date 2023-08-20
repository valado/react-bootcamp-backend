import { AuthResponse } from '../auth/auth';
const uuidv4 = require('uuid/v4');
import { kv } from '@vercel/kv';
import { DbAdapter, StoreOptions } from './DbAdapter';

const TTL = 12 * 60 * 60; // 24 hours
const redisOptions = {
  ex: TTL,
};
const redisOptionsNoOverwrite = {
  ex: TTL,
  nx: true,
};

const registerUser = (email: string, password: string) => {
  const newAcessToken = uuidv4();
  return Promise.all([
    storeData(
      email,
      {
        password: password,
        token: newAcessToken,
      },
      { overwrite: false }
    ),
    storeData(newAcessToken, {}, { overwrite: false }),
  ]).then(() => Promise.resolve());
};

const getTokenForUser = (
  email: string,
  password: string
): Promise<AuthResponse> =>
  getData(email).then((data: any) => {
    if (!data) {
      return {
        success: false,
        error: 'Invalid email! Registered?',
      };
    } else if (data.password === password) {
      return {
        success: true,
        token: data.token,
      };
    } else {
      return {
        success: false,
        error: 'Invalid password!',
      };
    }
  });

const tokenExists = (token: string) => getData(token).then((data) => !!data);

const isUserRegistered = (email: string) =>
  getData(email).then((data) => !!data);

const getData = (token: string) => {
  console.log('# getData');
  return new Promise((resolve) => {
    try {
      kv.get(token).then((data: any) => {
        console.log(data);
        if (!data) {
          resolve(null);
        }
        resolve(JSON.parse(data));
      });
    } catch (err) {
      console.error(err);
      resolve(null);
    }
  });
};

const storeData = (
  key: string,
  data: any,
  options: StoreOptions = {
    overwrite: true,
  }
): Promise<void> => {
  console.log('# storeData');
  return kv
    .set(
      key,
      JSON.stringify(data),
      options.overwrite ? redisOptions : redisOptionsNoOverwrite
    )
    .then((res) => {
      console.log(res);
      return Promise.resolve();
    });
};

export const kvDb: DbAdapter = {
  registerUser,
  getTokenForUser,
  tokenExists,
  isUserRegistered,
  getData,
  storeData,
};