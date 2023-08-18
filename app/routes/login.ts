import { Router } from "express";
import { Request, Response } from "express";
import { getTokenForUser } from "../db";
import { extractCredentials, getAuthHeader } from "./../utils";
import { FailedAuthResponse, SuccessfullAuthResponse } from "../auth/auth";
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
  const entry = getTokenForUser(credentials.email, credentials.password);
  if (entry.success) {
    return res
      .status(200)
      .json({ token: (entry as SuccessfullAuthResponse).token });
  } else {
    return res.status(401).send({ error: (entry as FailedAuthResponse).error });
  }
});

export default router;
