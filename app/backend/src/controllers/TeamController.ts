import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private bookService = new TeamService()) { }

  public async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.bookService.getAllTeams();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
