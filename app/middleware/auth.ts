import { tokenExists } from "./../db";
import { getAuthHeader } from "../utils";

export const authMiddleware = (req: any, res: any, next: any) => {
  let token = getAuthHeader(req.headers);
  token = token.replace("Bearer ", "");
  if (!token) {
    res.status(400);
    res.send("Invalid Authorization header!");
    return;
  }

  if (tokenExists(token)) {
    req.token = token;
    return next();
  } else {
    res.status(401);
    res.send("Not authorized!");
    return;
  }
};
