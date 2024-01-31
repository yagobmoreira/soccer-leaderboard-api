import { Router, Response, Request } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

matchRouter.patch(
  '/:id/finish',
  AuthMiddleware.authenticate,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default matchRouter;
