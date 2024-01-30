import { Router, Request, Response } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import Validations from '../middlewares/Validations';
import UserController from '../controllers/UserController';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

loginRouter.get(
  '/role',
  AuthMiddleware.authenticate,
  (req: Request, res: Response) => {
    const { role } = res.locals.auth;
    res.status(200).json({ role });
  },
);

export default loginRouter;
