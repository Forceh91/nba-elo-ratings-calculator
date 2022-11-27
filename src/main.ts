import { NBASeason } from "./season/seasonClass";

async function get2022Schedule() {
  const nbaSeason = new NBASeason();
  await nbaSeason.fetchSeason();
}

console.log("Fetching 2022 season schedule...");
get2022Schedule();
