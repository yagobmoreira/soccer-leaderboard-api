import { Router, Response, Request } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => matchController.getLeaderBoardHome(req, res),
);

leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response) => matchController.getLeaderBoardAway(req, res),
);

leaderBoardRouter.get(
  '/',
  (req: Request, res: Response) => matchController.getLeaderBoard(req, res),
);

export default leaderBoardRouter;
