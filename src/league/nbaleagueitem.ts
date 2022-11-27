import NBALeagueItemTeam from "./nbaleagueitemteam";

export default class NBALeagueItem {
  public gameId: string;
  public seasonStageId: number;
  public gameUrlCode: number;
  public statusNum: number;
  public extendedStatusNum: number;
  public isStartTimeTBD: boolean;
  public startTimeUTC: string;
  public startDateEastern: string;
  public isNeutralVenue: boolean;
  public startTimeEastern: string;
  public isBuzzerBeater: boolean;
  public hTeam: NBALeagueItemTeam;
  public vTeam: NBALeagueItemTeam;
}
