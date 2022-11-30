import { Router } from "express";
import { Request, Response } from "express";
import { getTokenForUser } from "../db";
import { extractCredentials, getAuthHeader } from "./../utils";
const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log("login");
  const authHeader = getAuthHeader(req.headers);
  console.log(authHeader);
  if (!authHeader) {
    res.status(400);
    return res.send("Invalid Authorization header!");
  }
  const credentials = extractCredentials(authHeader);
  console.log(credentials);
  if (!credentials) {
    res.status(400);
    return res.send("Invalid Authorization header!");
  }
  console.log(credentials);
  const entry = getTokenForUser(credentials.email, credentials.pass);
  if (entry.success) {
    return res.status(200).send(entry.data);
  } else {
    return res.status(401).send(entry.data);
  }
});

export default router;
