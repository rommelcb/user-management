import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Role from '../models/Role';

const createRole = (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.body;

  const role = new Role({
    _id: new mongoose.Types.ObjectId(),
    type
  });

  return role
    .save()
    .then((role) => res.status(201).json({ role }))
    .catch((role) => res.status(500).json({ role }));
};

const readRole = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  return Role.findById(id)
    .then((role) => (role ? res.status(200).json({ role }) : res.status(404).json({ message: 'Not Found'})))
    .catch((error) => res.status(500).json({ error }));
};

const readAllRole = (req: Request, res: Response, next: NextFunction) => {
  return Role.find()
    .then((role) => res.status(200).json({ role }))
    .catch((error) => res.status(500).json({ error }));
};

const updateRole = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  return Role.findById(id)
    .then((role) => {
      if (role) {
        role.set(req.body);

        return role
          .save()
          .then((role) => res.status(201).json({ role }))
          .catch((error) => res.status(500).json({ error }));
      }
      else {
        res.status(404).json({ message: 'Not Found'});
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteRole = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  return Role.findByIdAndDelete(id)
    .then((role) => (role ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not Found'})))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createRole,
  readRole,
  readAllRole,
  updateRole,
  deleteRole
}
