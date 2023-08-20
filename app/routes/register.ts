import { Router } from "express";
import { Request, Response } from "express";
import db from "../db";
import { extractCredentials, getAuthHeader } from "../utils";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const authHeader = getAuthHeader(req.headers);
    if (!authHeader) {
      res.status(400);
      res.send("Invalid Authorization header!");
      return;
    }
    const credentials = extractCredentials(authHeader);
    if (!credentials) {
      res.status(400);
      res.send("Invalid Credentials!");
      return;
    }

    const userExists = await db.isUserRegistered(credentials.email);

    if (userExists) {
      res.status(400);
      return res.send("Email is already taken!");
    } else {
      await db.registerUser(credentials.email, credentials.password);
      res.status(200);
      return res.send();
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  }
});

export default router;
