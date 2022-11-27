// interfaces are based off of this (data goes back to 2020)
// https://data.nba.net/prod/v1/2022/schedule.json

import NBALeague from "../league/nbaleague";
import NBALeagueItem from "../league/nbaleagueitem";
import axios, { AxiosResponse } from "axios";
import NBATeam from "../nbateam/nbateam";

export class NBASeason {
  private _internal: Object = {};
  private _league: NBALeague = new NBALeague();

  public async fetchSeason(): Promise<void> {
    await axios.get("https://data.nba.net/prod/v1/2022/schedule.json").then((resp: AxiosResponse) => {
      const data = resp.data;
      if (!data) return;

      this._internal = data.internal || {};
      this._league = new NBALeague(data.league);

      this._league.calculateEloForMatches();
    });
  }

  public get league(): NBALeague {
    return this._league;
  }

  public get standardLeagueGames(): Array<NBALeagueItem> {
    return this._league?.standardGames;
  }

  public get standardCompletedLeagueGames(): Array<NBALeagueItem> {
    return this._league?.standardCompletedGames;
  }

  public get standardLeagueTeams(): Array<NBATeam> {
    return this._league?.standardTeams;
  }
}
