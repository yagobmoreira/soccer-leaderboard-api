import { IMatchWithTeamName } from '../Interfaces/matches/IMatch';
import { ILeaderBoard } from '../Interfaces/leaderboard/ILeaderBoard';

type TeamType = 'homeTeam' | 'awayTeam';

const generateTeamTable = (team: string): ILeaderBoard => ({
  name: team,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

const calculatePoints = (team: ILeaderBoard, match: IMatchWithTeamName): ILeaderBoard => {
  const updatedTeam = { ...team };

  updatedTeam.totalGames += 1;
  updatedTeam.goalsFavor += match.homeTeamGoals;
  updatedTeam.goalsOwn += match.awayTeamGoals;
  updatedTeam.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;

  if (match.homeTeamGoals > match.awayTeamGoals) {
    updatedTeam.totalPoints += 3;
    updatedTeam.totalVictories += 1;
  } else if (match.homeTeamGoals === match.awayTeamGoals) {
    updatedTeam.totalPoints += 1;
    updatedTeam.totalDraws += 1;
  } else {
    updatedTeam.totalLosses += 1;
  }
  return updatedTeam;
};

const generateLeaderBoard = (
  matches: IMatchWithTeamName[],
  teamT: TeamType,
): ILeaderBoard[] => {
  const teamStats: Record<string, ILeaderBoard> = {};

  matches.forEach((match) => {
    if (match.inProgress) return;
    const team = match[teamT].teamName;

    if (!teamStats[team]) {
      teamStats[team] = generateTeamTable(team);
    }

    const updatedTeam = calculatePoints(teamStats[team], match);

    teamStats[team] = updatedTeam;
  });

  const leaderBoardArray: ILeaderBoard[] = Object.values(teamStats);

  return leaderBoardArray;
};

export default generateLeaderBoard;
