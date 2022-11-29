import NBATeam from "../../nbateam/nbateam";
import TeamRating from "./teamrating";

import elostyles from "./elorating.module.scss";
import styles from "./teamrating.module.scss";

interface iEloRatings {
  games: number;
  teams: Array<NBATeam>;
}

function EloRatings(props: iEloRatings) {
  const { games, teams } = props || {};
  if (!teams.length) return <div>No teams are available</div>;

  return (
    <div className={elostyles.container}>
      <h3>Completed Games: {games}</h3>
      <table className={"table table-striped " + elostyles.table}>
        <colgroup>
          <col style={{ width: 20 }} />
          <col style={{ width: 50 }} />
          <col style={{ width: 200 }} />
          <col style={{ width: 120 }} />
          <col style={{ width: 50 }} />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.right}>#</th>
            <th></th>
            <th>Team</th>
            <th className={styles.right}>Rating</th>
            <th className={styles.right}>Avg +/-</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team: NBATeam, ix: number) => (
            <TeamRating pos={ix + 1} team={team} key={team.id}></TeamRating>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EloRatings;
