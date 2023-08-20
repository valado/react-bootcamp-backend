import { Router } from "express";
import { Request, Response } from "express";
import db from "../db";
import { CustomRequest } from "../model/CustomRequest";
const router = Router();

router.post("/", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  console.log(token);
  console.log(req.body);
  db.storeData(token, req.body)
    .then(() => {
      res.status(200);
      return res.send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      return res.send("Server error!");
    });
});

router.get("/", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  db.getData(token)
    .then((data) => {
      if (!data) {
        res.status(500);
        return res.send("Server error!");
      }
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      return res.send("Server error!");
    });
});

export default router;
