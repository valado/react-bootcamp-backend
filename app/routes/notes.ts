import { Router } from "express";
import { Request, Response } from "express";
import { storeData, getData } from "../db";
import { CustomRequest } from "../model/CustomRequest";
const uuidv4 = require("uuid/v4");
const router = Router();

router.get("/", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const notes = getData(token);
  if (!notes) {
    res.status(500);
    return res.send("Server error!");
  }
  return res.json({
    notes,
  });
});

router.put("/", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const note = req.body.note;
  if (!note) {
    res.status(400);
    return res.send("Bad Request!");
  }
  const notes = getData(token);
  if (!notes) {
    res.status(500);
    return res.send("Server error!");
  }
  const newId = uuidv4();
  notes[newId] = { id: newId, ...note };
  storeData(token, notes);
  return res.json({ id: newId });
});

router.patch("/:id", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const note = req.body.note;
  const id = req.params.id;
  if (!note) {
    res.status(400);
    return res.send("Bad Request!");
  }
  const notes = getData(token);
  if (!notes) {
    res.status(500);
    return res.send("Server error!");
  }
  notes[id] = note;
  storeData(token, notes);
  return res.send();
});

router.delete("/:id", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const id = req.params.id;
  const notes = getData(token);
  if (!notes) {
    res.status(500);
    return res.send("Server error!");
  }
  delete notes[id];
  storeData(token, notes);
  return res.send();
});

export default router;
