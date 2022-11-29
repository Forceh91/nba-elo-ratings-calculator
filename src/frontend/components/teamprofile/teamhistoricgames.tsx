import HistoricEloGame from "../../../elorating/historicelogame";

interface iTeamHistoricGames {
  games: Array<HistoricEloGame>;
}

function TeamHistoricGames(props: iTeamHistoricGames) {
  const { games } = props;

  const roundedElo = (elo: number): number => {
    return Math.round(elo);
  };

  const eloGained = (before: number, after: number): string => {
    const diff = after - before;
    return (diff > 0 ? "+" : "") + roundedElo(diff);
  };

  const newestToOldestGames = games.reverse();

  return (
    <table className="table table-striped">
      <colgroup>
        <col style={{ width: 20 }} />
        <col style={{ width: 50 }} />
        <col style={{ width: 20 }} />
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
              {historicGame.opponentId} ({roundedElo(historicGame.opponentElo)})
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
