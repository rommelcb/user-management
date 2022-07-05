import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.user.create), controller.createUser);
router.get('/:id', controller.readUser);
router.get('/', controller.readAllUser);
router.patch('/:id', ValidateSchema(Schemas.role.update), controller.updateUser);
router.delete('/:id', controller.deleteUser);

export = router;
