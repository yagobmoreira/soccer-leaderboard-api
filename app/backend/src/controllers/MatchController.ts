import { Request, Response } from 'express';
import TeamModel from '../models/TeamModel';
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

  static async verifyTeams(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const teamModel = new TeamModel();
    const foundHomeTeam = await teamModel.findById(homeTeamId);
    const foundAwayTeam = await teamModel.findById(awayTeamId);
    if (!foundAwayTeam || !foundHomeTeam) return false;
    return true;
  }

  public async createMatch(req: Request, res: Response) {
    const isValidTeams = await MatchController
      .verifyTeams(req.body.homeTeamId, req.body.awayTeamId);

    if (!isValidTeams) return res.status(404).json({ message: 'There is no team with such id!' });

    if (req.body.homeTeamId === req.body.awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const { data } = await this.matchService.createMatch(req.body);
    res.status(201).json(data);
  }

  public async getLeaderBoardHome(req: Request, res: Response) {
    const { status, data } = await this.matchService.getLeaderBoardHome();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderBoardAway(req: Request, res: Response) {
    const { status, data } = await this.matchService.getLeaderBoardAway();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderBoard(req: Request, res: Response) {
    const { status, data } = await this.matchService.getLeaderBoard();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
