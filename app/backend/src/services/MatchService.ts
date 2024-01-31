import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

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
}
