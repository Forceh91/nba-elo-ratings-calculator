import React, { useState, useEffect } from "react";
import NBATeam from "../../../nbateam/nbateam";

import HistoricEloGame from "../../../elorating/historicelogame";
import style from "./teamhistoricgames.module.scss";

interface iTeamHistoricGames {
  games: Array<HistoricEloGame>;
}

function TeamHistoricGames(props: iTeamHistoricGames) {
  const { games } = props;

  const [data, setData] = useState<Array<NBATeam> | null>(null);

  useEffect(() => {
    if (!games || !games.length) return;

    fetch(`//localhost:8600/api/v1/teams/${opponentIDsForAPI()}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [games]);

  const opponentIDsForAPI = (): string => {
    return (games && games.map((game) => game.opponentId).join(",")) || "";
  };

  const roundedElo = (elo: number): number => {
    return Math.round(elo);
  };

  const eloGained = (before: number, after: number): string => {
    const diff = after - before;
    return (diff > 0 ? "+" : "") + roundedElo(diff);
  };

  const getOpponentNameFromID = (id: number): string => {
    if (!data || !data.length) return `${id}`;

    const opponent = data.find((team: NBATeam) => team.id === id);
    return opponent?.fullName || `${id}`;
  };

  const newestToOldestGames = games.reverse();

  return (
    <table className={`${style.historyTable} table table-striped`}>
      <colgroup>
        <col style={{ width: 100 }} />
        <col style={{ width: 300 }} />
        <col style={{ width: 100 }} />
      </colgroup>
      <thead>
        <tr>
          <th>Pre Elo</th>
          <th>Opponent</th>
          <th>Post Elo</th>
        </tr>
      </thead>
      <tbody>
        {newestToOldestGames.map((historicGame: HistoricEloGame) => (
          <tr>
            <td>{roundedElo(historicGame.eloBeforeGame)}</td>
            <td>
              {getOpponentNameFromID(historicGame.opponentId)} ({roundedElo(historicGame.opponentElo)})
            </td>
            <td>
              {roundedElo(historicGame.eloAfterGame)} (
              {eloGained(historicGame.eloBeforeGame, historicGame.eloAfterGame)})
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamHistoricGames;
