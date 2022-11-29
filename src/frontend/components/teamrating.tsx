import classNames from "classnames";
import NBATeam from "../../nbateam/nbateam";
import styles from "./teamrating.module.scss";

interface iTeamRating {
  pos: number;
  team: Partial<NBATeam>;
}

function TeamRating(props: iTeamRating) {
  const { pos, team } = props;

  const getAverageEloPerGame = (): number => {
    if (!team.eloRatingHistory || !team.eloRatingHistory.length) return 0.0;

    // use the history to figure out the average change in elo per game
    let changeTotal: number = team.eloRatingHistory.reduce((acc: number, curr: number, ix: number) => {
      if (!ix) return acc;

      // figure out the diff between this elo and the previous one
      const change = curr - team.eloRatingHistory[ix - 1];
      return acc + change;
    }, 0.0);

    return Number((changeTotal / team.eloRatingHistory.length).toFixed(1));
  };

  const avgEloPerGame = getAverageEloPerGame();

  return (
    <tr>
      <td className={styles.right}>{pos}</td>
      <td>{team.tricode}</td>
      <td>{team.fullName}</td>
      <td className={styles.right}>{team.roundedEloRating}</td>
      <td
        className={`${styles.right} ${classNames({
          "table-danger": avgEloPerGame < 0,
          "table-success": avgEloPerGame > 0,
        })}`}
      >
        {avgEloPerGame.toFixed(1)}
      </td>
    </tr>
  );
}

export default TeamRating;
