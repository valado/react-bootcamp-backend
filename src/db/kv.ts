import { AuthResponse } from '../auth/auth';
import { v4 as uuid } from 'uuid';
import { kv } from '@vercel/kv';
import { DbAdapter, StoreOptions } from './DbAdapter';
import { convert2NotesKey, convert2IssuesKey } from './utils';

const TTL = 12 * 60 * 60; // 12 hours
const redisOptions = {
  ex: TTL,
};
const redisOptionsNoOverwrite = {
  ex: TTL,
  nx: true,
};

const registerUser = (email: string, password: string) => {
  const newAcessToken = uuid();
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
    storeData(convert2NotesKey(newAcessToken), {}, { overwrite: false }),
    storeData(convert2IssuesKey(newAcessToken), {}, { overwrite: false }),
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
        resolve(data);
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
  console.log(data);
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
