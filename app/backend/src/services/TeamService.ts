import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces/teams/ITeam';
import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamService {
  constructor(private bookModel: ITeamModel = new TeamModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.bookModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
