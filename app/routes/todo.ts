import { Router } from "express";
import { Request, Response } from "express";
import { storeData, getData } from "../db";
import { CustomRequest } from "../model/CustomRequest";
const uuidv4 = require("uuid/v4");
const router = Router();

router.get("/", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const todos = getData(token);
  if (!todos) {
    res.status(500);
    return res.send("Server error!");
  }
  return res.json({
    todos,
  });
});

router.put("/", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const todo = req.body.todo;
  if (!todo) {
    res.status(400);
    return res.send("Bad Request!");
  }
  const todos = getData(token);
  if (!todos) {
    res.status(500);
    return res.send("Server error!");
  }
  const newId = uuidv4();
  todos[newId] = todo;
  storeData(token, todos);
  return res.json({ id: newId });
});

router.patch("/:id", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const todo = req.body.todo;
  const id = req.params.id;
  if (!todo) {
    res.status(400);
    return res.send("Bad Request!");
  }
  const todos = getData(token);
  if (!todos) {
    res.status(500);
    return res.send("Server error!");
  }
  todos[id] = todo;
  storeData(token, todos);
  return res.send();
});

router.delete("/:id", (req: Request, res: Response) => {
  const token = (req as CustomRequest).token;
  const id = req.params.id;
  const todos = getData(token);
  if (!todos) {
    res.status(500);
    return res.send("Server error!");
  }
  delete todos[id];
  storeData(token, todos);
  return res.send();
});

export default router;
