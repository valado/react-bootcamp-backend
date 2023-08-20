import { AuthResponse } from "../auth/auth";

export type StoreOptions = {
  overwrite?: boolean;
};

export interface DbAdapter {
  registerUser: (email: string, password: string) => Promise<void>;
  getTokenForUser: (email: string, password: string) => Promise<AuthResponse>;
  tokenExists: (token: string) => Promise<boolean>;
  isUserRegistered: (email: string) => Promise<boolean>;
  getData: (token: string) => Promise<any>;
  storeData: (
    token: string,
    data: any,
    options?: StoreOptions
  ) => Promise<void>;
}
