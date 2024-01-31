import { ILeaderBoard } from '../Interfaces/leaderboard/ILeaderBoard';

const sortClassification = (classification: ILeaderBoard[]): ILeaderBoard[] => {
  const sorted = classification.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }

    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }

    if (a.goalsFavor !== b.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }

    return 0;
  });

  return sorted;
};

export default sortClassification;
