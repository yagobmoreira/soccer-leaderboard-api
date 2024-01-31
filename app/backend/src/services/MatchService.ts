import sortClassification from '../utils/sortClassification';
import generateLeaderBoard from '../utils/leaderBoardUtils';
import { ILeaderBoard } from '../Interfaces/leaderboard/ILeaderBoard';
import { NewEntity } from '../Interfaces';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

type updateScoreParams = {
  homeTeamGoals: number,
  awayTeamGoals: number
};
export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByProgress(q: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findByQuery(q);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateMatchProgress(id: number):
  Promise<ServiceResponse<ServiceMessage>> {
    const foundMatch = await this.matchModel.findById(id);
    if (!foundMatch) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const finishedMatch = { ...foundMatch, inProgress: false };

    await this.matchModel.update(id, finishedMatch);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchScore(id: number, score: updateScoreParams):
  Promise<ServiceResponse<ServiceMessage>> {
    const foundMatch = await this.matchModel.findById(id);
    if (!foundMatch) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    const updatedMatchScore = {
      ...foundMatch,
      homeTeamGoals: score.homeTeamGoals,
      awayTeamGoals: score.awayTeamGoals,
    };

    await this.matchModel.update(id, updatedMatchScore);

    return { status: 'SUCCESSFUL', data: { message: 'Score updated' } };
  }

  public async createMatch(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const newMatch = { ...match, inProgress: true };
    const createdMatch = await this.matchModel.create(newMatch);
    return { status: 'SUCCESSFUL', data: createdMatch };
  }

  public async getLeaderBoardHome(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.findAll();

    const data = generateLeaderBoard(matches, 'homeTeam');
    const teamsWithEfficiecy = MatchService.generateEfficiency(data);

    const sortedClassification = sortClassification(teamsWithEfficiecy);

    return { status: 'SUCCESSFUL', data: sortedClassification };
  }

  public async getLeaderBoardAway(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchModel.findAll();

    const data = generateLeaderBoard(matches, 'awayTeam');

    const teamsWithEfficiecy = MatchService.generateEfficiency(data);

    const sortedClassification = sortClassification(teamsWithEfficiecy);

    return { status: 'SUCCESSFUL', data: sortedClassification };
  }

  // public async getLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
  //   const matches = await this.matchModel.findAll();
  // }

  static generateEfficiency(data: ILeaderBoard[]): ILeaderBoard[] {
    const teamsWithEfficiecy = data.map((leaderBoard) => {
      const obj = { ...leaderBoard };
      return {
        ...obj,
        efficiency:
          Number(((leaderBoard.totalPoints / (leaderBoard.totalGames * 3)) * 100).toFixed(2)),
      };
    });
    return teamsWithEfficiecy;
  }
}
