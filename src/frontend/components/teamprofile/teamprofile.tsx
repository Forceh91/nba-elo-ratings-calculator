import Link from "next/link";
import NBATeam from "../../../nbateam/nbateam";
import TeamHistoricGames from "./teamhistoricgames";
import style from "./teamprofile.module.scss";

interface iStatInterface {
  title: string;
  data: any;
}

function TeamProfile(props: Partial<NBATeam>) {
  const Stat = (props: iStatInterface) => {
    const { title, data } = props;
    return (
      <div className={`${style.stat} col-md-4`}>
        <div>{title}</div>
        <div>{data}</div>
      </div>
    );
  };

  const lastGameEloChange = () => {
    // get the last two elos from history and calculate the diff
    const lastTwoEloInHistory = props.eloRatingHistory.slice(-2);
    const diff = lastTwoEloInHistory[1] - lastTwoEloInHistory[0];
    return (diff < 0 ? "" : "+") + diff.toFixed(2);
  };

  const games = props.eloRatingHistory.length || 0;
  const last5Games = props.history.slice(-5)?.reverse();

  return (
    <div id={style.team_profile}>
      <h1 id={style.team_name}>
        {props.fullName} ({props.tricode})
      </h1>
      <h2 id={style.elorating}>Elo Rating: {props.eloRating.toFixed(2)}</h2>

      <div className="row col-md-12">
        <Stat title="Games" data={games}></Stat>
        <Stat title="Last Game +/-" data={lastGameEloChange()}></Stat>
        <Stat title="Average +/-" data={props.eloRatingChangeAverage.toFixed(1)}></Stat>
      </div>

      <div id={style.game_history}>
        <h3 id={style.game_history_title}>Last 5 Games</h3>
        <TeamHistoricGames games={last5Games} />
      </div>

      <div id={style.back_link} className="row col-md-12">
        <Link href="/">Back to Standings</Link>
      </div>
    </div>
  );
}

export default TeamProfile;
