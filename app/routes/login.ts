import { Router } from "express";
import { Request, Response } from "express";
import db from "../db";
import { extractCredentials, getAuthHeader } from "./../utils";
import { FailedAuthResponse, SuccessfullAuthResponse } from "../auth/auth";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const authHeader = getAuthHeader(req.headers);
    if (!authHeader) {
      res.status(400);
      return res.send("Invalid Authorization header!");
    }
    const credentials = extractCredentials(authHeader);
    if (!credentials) {
      res.status(400);
      return res.send("Invalid Authorization header!");
    }
    const entry = await db.getTokenForUser(
      credentials.email,
      credentials.password
    );
    if (entry.success) {
      return res
        .status(200)
        .json({ token: (entry as SuccessfullAuthResponse).token });
    } else {
      return res
        .status(401)
        .send({ error: (entry as FailedAuthResponse).error });
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send("Server error!");
  }
});

export default router;
