import NBATeam from "../../nbateam/nbateam";
import styles from "./teamrating.module.scss";

interface iTeamRating {
  pos: number;
  team: Partial<NBATeam>;
}

function TeamRating(props: iTeamRating) {
  const { pos, team } = props;
  return (
    <tr>
      <td className={styles.right}>{pos}</td>
      <td>{team.tricode}</td>
      <td>{team.fullName}</td>
      <td className={styles.right}>{team.roundedEloRating}</td>
    </tr>
  );
}

export default TeamRating;
