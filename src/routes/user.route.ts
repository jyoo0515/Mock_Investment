import express from 'express';
import * as userController from '../controllers/user.controller';
import * as auth from '../middleware/auth';
const router = express.Router();

router.route('/').all(auth.verifyToken).get(userController.getAll).delete(userController.deleteUser).put(userController.updateUser);
router.route('/me').all(auth.verifyToken).get(userController.me);
router.route('/unique/:username').get(userController.checkUnique);
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/logout').all(auth.verifyToken).get(userController.logout);

export default router;
