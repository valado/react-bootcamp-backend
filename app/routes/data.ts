import { Router } from "express";
import { Request, Response } from "express";
import { storeData, getData } from "../db";
import { CustomRequest } from "../model/CustomRequest";
const router = Router();

router.post("/", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  console.log(token);
  console.log(req.body);
  storeData(token, req.body);
  res.status(200);
  return res.send();
});

router.get("/", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  console.log(token);
  const data = getData(token);
  if (!data) {
    res.status(500);
    return res.send("Server error!");
  }
  res.setHeader("Content-Type", "application/json");
  return res.json(data);
});

export default router;
