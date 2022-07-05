import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password, role } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstname, 
    lastname, 
    email, 
    password,
    role
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  return User.findById(id)
    .populate('role', { "_id": 0, "type": 1 })
    .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not Found'})))
    .catch((error) => res.status(500).json({ error }));
};

const readAllUser = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .select({ "_id": 0, "firstname": 1, "lastname": 1, "email": 1 })
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  return User.findById(id)
    .then((user) => {
      if (user) {
        user.set(req.body);

        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      }
      else {
        res.status(404).json({ message: 'Not Found'});
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  return User.findByIdAndDelete(id)
    .then((user) => (user ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not Found'})))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createUser,
  readUser,
  readAllUser,
  updateUser,
  deleteUser
}
