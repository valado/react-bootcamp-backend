import { kvDb } from "./kv";
import { mockDb } from "./db";
import { DbAdapter } from "./DbAdapter";

const production = process.env.NODE_ENV === "production";

const db: DbAdapter = production ? kvDb : mockDb;
export default db;
