import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../budget.db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, amount } = req.body;

    db.run('INSERT INTO budgets (name, amount) VALUES (?, ?)', [name, amount], function (err) {
      if (err) {
        res.status(500).json({ error: 'Failed to insert data' });
        return;
      }
      res.status(200).json({ id: this.lastID, name, amount });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
