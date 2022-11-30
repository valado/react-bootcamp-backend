import { Router } from "express";
import { Request, Response } from "express";
import { isUserRegistered, registerUser } from "../db";
import { extractCredentials, getAuthHeader } from "../utils";
const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log("register");
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
  console.log(credentials);
  if (isUserRegistered(credentials.email)) {
    res.status(400);
    return res.send("Email is already taken!");
  } else {
    registerUser(credentials.email, credentials.pass);
    res.status(200);
    return res.send();
  }
});

export default router;
