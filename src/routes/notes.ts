import { Router } from 'express';
import { Request, Response } from 'express';
import db from '../db';
import { CustomRequest } from '../model/CustomRequest';
import { uuid } from 'uuidv4';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    const notes = await db.getData(token);

    if (!notes) {
      res.status(500);
      return res.send('Server error!');
    }
    return res.json({
      notes,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send('Server error!');
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    const note = req.body.note;
    if (!note) {
      res.status(400);
      return res.send('Bad Request!');
    }

    const notes = await db.getData(token);
    if (!notes) {
      res.status(500);
      return res.send('Server error!');
    }
    const newId = uuid();
    notes[newId] = { id: newId, ...note };
    await db.storeData(token, notes);
    return res.json({ id: newId });
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send('Server error!');
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    const note = req.body.note;
    const id = req.params.id;
    if (!note) {
      res.status(400);
      return res.send('Bad Request!');
    }
    const notes = await db.getData(token);
    if (!notes) {
      res.status(500);
      return res.send('Server error!');
    }
    notes[id] = note;
    await db.storeData(token, notes);
    return res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send('Server error!');
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    const id = req.params.id;
    const notes = await db.getData(token);
    if (!notes) {
      res.status(500);
      return res.send('Server error!');
    }
    delete notes[id];
    await db.storeData(token, notes);
    return res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send('Server error!');
  }
});

export default router;
