import { Router } from 'express';
import { Request, Response } from 'express';
import db from '../db';
import { CustomRequest } from '../model/CustomRequest';
import { convert2IssuesKey } from 'src/db/utils';
const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    await db.storeData(convert2IssuesKey(token), req.body);

    res.status(200);
    return res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send('Server error!');
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const token = (req as CustomRequest).token;
    const data = await db.getData(convert2IssuesKey(token));

    if (!data) {
      res.status(500);
      return res.send('Server error!');
    }
    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.send('Server error!');
  }
});

export default router;
