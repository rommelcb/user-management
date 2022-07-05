import express from 'express';
import controller from '../controllers/Role';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.role.create), controller.createRole);
router.get('/:id', controller.readRole);
router.get('/', controller.readAllRole);
router.patch('/:id', ValidateSchema(Schemas.role.update), controller.updateRole);
router.delete('/:id', controller.deleteRole);

export = router;