import {Router} from 'express';
import db from '../db.js'

const router = Router();

router.get('/ping', async (req, res) => {
    const [rows] = await db.execute('SELECT 1 + 1 as result')
    console.log(rows);
    res.json(rows)
});

export default router;