import { NextFunction, Request, Response } from 'express';
import User from '../entity/user.entity';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user: User) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '4h',
  });
  return token;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['access_token'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
    if (err) return res.status(403).json({ message: 'Unauthenticated' });

    req.user = authData;
    next();
  });
};
