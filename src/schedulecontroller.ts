import NBASchedule from "./schedule/schedule";

let nbaSchedule: NBASchedule;

function createNBASchedule(schedule: object): NBASchedule {
  if (nbaSchedule) nbaSchedule;
  return (nbaSchedule = new NBASchedule(schedule));
}

function getNBASchedule(): NBASchedule | undefined {
  return nbaSchedule;
}

export { createNBASchedule, getNBASchedule };
