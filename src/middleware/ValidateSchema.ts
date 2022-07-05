import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
import { IRole } from '../models/Role';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    }
    catch (error) {
      console.log(error);
      return res.status(422).json({ error });
    }
  }
};

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    update: Joi.object<IUser>({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },
  role: {
    create: Joi.object<IRole>({
      type: Joi.string().required()
    }),
    update: Joi.object<IRole>({
      type: Joi.string().required()
    })
  }
};

