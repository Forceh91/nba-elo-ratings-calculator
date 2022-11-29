import NBATeam from "../../nbateam/nbateam";
import styles from "./teamrating.module.scss";

interface iTeamRating {
  pos: number;
  team: Partial<NBATeam>;
}

function TeamRating(props: iTeamRating) {
  const { pos, team } = props;

  const getAverageEloPerGame = (): string => {
    if (!team.eloRatingHistory || !team.eloRatingHistory.length) return "0";

    // use the history to figure out the average change in elo per game
    let changeTotal: number = team.eloRatingHistory.reduce((acc: number, curr: number, ix: number) => {
      if (!ix) return acc;

      // figure out the diff between this elo and the previous one
      const change = curr - team.eloRatingHistory[ix - 1];
      return acc + change;
    }, 0);

    return (changeTotal / team.eloRatingHistory.length).toFixed(1);
  };

  return (
    <tr>
      <td className={styles.right}>{pos}</td>
      <td>{team.tricode}</td>
      <td>{team.fullName}</td>
      <td className={styles.right}>{team.roundedEloRating}</td>
      <td className={styles.right}>{getAverageEloPerGame()}</td>
    </tr>
  );
}

export default TeamRating;
