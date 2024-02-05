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

const calculateResults = (teamGoals: number, opponentGoals: number) => {
  let pointsToAdd = 0;
  let victoriesToAdd = 0;
  let drawsToAdd = 0;
  let lossesToAdd = 0;

  if (teamGoals > opponentGoals) {
    pointsToAdd = 3;
    victoriesToAdd = 1;
  } else if (teamGoals === opponentGoals) {
    pointsToAdd = 1;
    drawsToAdd = 1;
  } else {
    lossesToAdd = 1;
  }

  return { pointsToAdd, victoriesToAdd, drawsToAdd, lossesToAdd };
};

const getTeamGoals = (teamType: TeamType, match: IMatchWithTeamName) => {
  const isHomeTeam = teamType === 'homeTeam';
  const { homeTeamGoals, awayTeamGoals } = match;
  const teamGoals = isHomeTeam ? homeTeamGoals : awayTeamGoals;
  const opponentGoals = isHomeTeam ? awayTeamGoals : homeTeamGoals;
  return { teamGoals, opponentGoals };
};

const calculatePoints = (team: ILeaderBoard, match: IMatchWithTeamName, teamType: TeamType)
: ILeaderBoard => {
  const { teamGoals, opponentGoals } = getTeamGoals(teamType, match);

  const { pointsToAdd, victoriesToAdd, drawsToAdd, lossesToAdd } = calculateResults(
    teamGoals,
    opponentGoals,
  );

  return {
    ...team,
    totalGames: team.totalGames + 1,
    goalsFavor: team.goalsFavor + teamGoals,
    goalsOwn: team.goalsOwn + opponentGoals,
    goalsBalance: team.goalsBalance + teamGoals - opponentGoals,
    totalPoints: team.totalPoints + pointsToAdd,
    totalVictories: team.totalVictories + victoriesToAdd,
    totalDraws: team.totalDraws + drawsToAdd,
    totalLosses: team.totalLosses + lossesToAdd,
  };
};

export const generateTeamStats = (
  matches: IMatchWithTeamName[],
  teamType: TeamType,
): ILeaderBoard[] => {
  const teamStats: Record<string, ILeaderBoard> = {};

  matches.forEach((match) => {
    if (match.inProgress) return;
    const team = match[teamType].teamName;

    if (!teamStats[team]) {
      teamStats[team] = generateTeamTable(team);
    }

    const updatedTeam = calculatePoints(teamStats[team], match, teamType);

    teamStats[team] = updatedTeam;
  });

  const leaderBoardArray: ILeaderBoard[] = Object.values(teamStats);

  return leaderBoardArray;
};

export function generateLeaderBoard(matches: IMatchWithTeamName[]): ILeaderBoard[] {
  const teamStats: Record<string, ILeaderBoard> = {};

  matches.forEach((match) => {
    const { homeTeam, awayTeam, inProgress } = match;
    if (inProgress) return;

    if (!teamStats[homeTeam.teamName]) {
      teamStats[homeTeam.teamName] = generateTeamTable(homeTeam.teamName);
    }

    if (!teamStats[awayTeam.teamName]) {
      teamStats[awayTeam.teamName] = generateTeamTable(awayTeam.teamName);
    }

    const homeTeamStats = teamStats[homeTeam.teamName];
    const awayTeamStats = teamStats[awayTeam.teamName];

    const updatedHomeTeamStats = calculatePoints(homeTeamStats, match, 'homeTeam');
    const updatedAwayTeamStats = calculatePoints(awayTeamStats, match, 'awayTeam');

    teamStats[homeTeam.teamName] = updatedHomeTeamStats;
    teamStats[awayTeam.teamName] = updatedAwayTeamStats;
  });

  return Object.values(teamStats);
}
