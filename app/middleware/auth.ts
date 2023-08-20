import { extractToken, getAuthHeader } from "../utils";
import db from "./../db";

export const authMiddleware = async (req: any, res: any, next: any) => {
  const authHeader = getAuthHeader(req.headers);
  const token = extractToken(authHeader);
  if (!token) {
    res.status(400);
    res.send("Invalid Token!");
    return;
  }

  try {
    const tokenExists = await db.tokenExists(token);
    if (tokenExists) {
      req.token = token;
      return next();
    } else {
      res.status(401);
      res.send("Not authorized! Registered?");
      return;
    }
  } catch (e) {
    res.status(500);
    res.send("Internal Server Error!");
    return;
  }
};
