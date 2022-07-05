import express from 'express';
import controller from '../controllers/Role';

const router = express.Router();

router.post('/', controller.createRole);
router.get('/:id', controller.readRole);
router.get('/', controller.readAllRole);
router.patch('/:id', controller.updateRole);
router.delete('/:id', controller.deleteRole);

export = router;