import User from '../entity/user.entity';
import { Request, Response } from 'express';
import * as auth from '../middleware/auth';

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const userDTOs = [];
    users.map((user) => userDTOs.push(user.destruct()));
    return res.json(userDTOs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const me = async (req: Request, res: Response) => {
  const username = req.user.username;
  try {
    const user = await User.findOneBy({ username });
    return res.json(user.destruct());
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const checkUnique = async (req: Request, res: Response) => {
  const username = req.params.username;
  const unique = await User.checkUnique(username);
  return res.json({ unique });
};

export const register = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body;
  if (User.checkUnique(username)) {
    try {
      const user = new User();
      user.username = username;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;

      const savedUser = await User.save(user);
      return res.status(201).json(savedUser.destruct());
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Seomthing went wrong' });
    }
  } else {
    return res.status(409).json({ message: 'Username already in use' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOneBy({ username });

    if (user) {
      const valid = await user.validatePassword(password);
      if (valid) {
        const token = auth.generateToken(user);
        return res
          .cookie('access_token', token, {
            expires: new Date(new Date().getTime() + 4 * 3600 * 1000),
            httpOnly: true,
          })
          .json({ loginSuccess: true, message: 'Logged in' });
      } else {
        return res.status(403).json({ loginSuccess: false, message: 'Incorrect password' });
      }
    } else {
      return res.status(400).json({ loginSuccess: false, message: 'User not found' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ loginSuccess: false, message: 'Something went wrong' });
  }
};

export const logout = async (req: Request, res: Response) => {
  return res.clearCookie('access_token').json({ logoutSuccess: true, message: 'Logged out' });
};

export const deleteUser = async (req: Request, res: Response) => {
  const username = req.user.username;
  try {
    await User.delete({ username });
    return res.clearCookie('access_token').json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const username = req.user.username;
  const { firstName, lastName } = req.body;
  try {
    const user = await User.findOneBy({ username });
    user.firstName = firstName;
    user.lastName = lastName;
    await User.upsert(user, ['username']);
    return res.json({ message: 'Successfully updated' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
