import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/', controller.createUser);
router.get('/:id', controller.readUser);
router.get('/', controller.readAllUser);
router.patch('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export = router;
