import { Identifiable } from '..';

export interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchWithTeamName extends IMatch {
  homeTeam: {
    teamName: string;
  },
  awayTeam: {
    teamName: string;
  }
}
