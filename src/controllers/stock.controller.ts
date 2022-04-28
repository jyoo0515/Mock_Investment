import Stock from '../entity/stock.entity';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find({ take: 10 });
    return res.json(stocks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
