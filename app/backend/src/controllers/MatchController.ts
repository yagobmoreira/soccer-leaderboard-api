import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const boolInProgres = inProgress === 'true';
    if (inProgress) {
      const { status, data } = await this.matchService.getMatchesByProgress(boolInProgres);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchService.getAllTeams();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
