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
    const updatedMatch = await this.matchModel.update(id, finishedMatch);
    console.log(updatedMatch);

    if (!updatedMatch) {
      return {
        status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` },
      };
    }
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
    const updatedMatch = await this.matchModel.update(id, updatedMatchScore);

    if (!updatedMatch) {
      return {
        status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Score updated' } };
  }

  public async createMatch(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const newMatch = { ...match, inProgress: true };
    const createdMatch = await this.matchModel.create(newMatch);
    return { status: 'SUCCESSFUL', data: createdMatch };
  }
}
