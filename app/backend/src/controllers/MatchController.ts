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

  public async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    const { status, data } = await this.matchService.updateMatchProgress(Number(id));

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    res.status(200).json(data);
  }

  public async updateMatchScore(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateMatchScore(Number(id), req.body);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    res.status(200).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { data } = await this.matchService.createMatch(req.body);
    res.status(201).json(data);
  }
}
