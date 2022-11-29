import classNames from "classnames";
import NBATeam from "../../nbateam/nbateam";
import styles from "./teamrating.module.scss";

interface iTeamRating {
  pos: number;
  leader: Partial<NBATeam>;
  team: Partial<NBATeam>;
}

function TeamRating(props: iTeamRating) {
  const { pos, leader, team } = props;

  const avgEloPerGame = team.eloRatingChangeAverage;
  const games = team.eloRatingHistory.length;
  const gapToLeader = -(leader.roundedEloRating - team.roundedEloRating);

  return (
    <tr>
      <td className={styles.right}>{pos}</td>
      <td>{team.tricode}</td>
      <td>{team.fullName}</td>
      <td className={styles.right}>{games}</td>
      <td className={styles.right}>{team.roundedEloRating}</td>
      <td className={styles.right}>{gapToLeader}</td>
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
