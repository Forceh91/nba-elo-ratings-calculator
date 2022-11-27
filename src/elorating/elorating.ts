const DEFAULT_ELO_RATING = 1500;
const KFACTOR = 20;

function calculateEloChange(expected: number, actual: number) {
  return KFACTOR * (actual - expected);
}

export { DEFAULT_ELO_RATING, KFACTOR, calculateEloChange };
