import { extractToken, getAuthHeader } from "../utils";
import { tokenExists } from "./../db";

export const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = getAuthHeader(req.headers);
  const token = extractToken(authHeader);
  if (!token) {
    res.status(400);
    res.send("Invalid Token!");
    return;
  }

  if (tokenExists(token)) {
    req.token = token;
    return next();
  } else {
    res.status(401);
    res.send("Not authorized! Registered?");
    return;
  }
};
