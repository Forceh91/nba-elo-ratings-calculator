import NBATeam from "../src/nbateam/nbateam";

const opponent = new NBATeam(2, "Magic", "ORL", "Orlando");

describe("NBATeam", () => {
  let nbateam: NBATeam;

  beforeEach(() => {
    nbateam = new NBATeam(1, "Raptors", "TOR", "Toronto");
  });

  it("addWin: adds a win correctly when changing elo rating", (done) => {
    nbateam.changeEloRating("002123", 5, true, opponent);
    nbateam.changeEloRating("002124", -5, true, opponent);
    expect(nbateam.wins).toBe(1);
    done();
  });

  it("changeEloRating: changes without elo history tracking", (done) => {
    const preElo = nbateam.eloRating;
    const eloChange = 5;
    nbateam.changeEloRating("002123", eloChange, false, opponent);

    // elo rating history always includes the current rating
    expect(nbateam.eloRating).toBe(preElo + eloChange);
    expect(nbateam.eloRatingHistory.length).toBe(1);
    expect(nbateam.eloRatingHistory[0]).toBe(preElo + eloChange);
    done();
  });

  it("changeEloRating: changes with elo history tracking", (done) => {
    const preElo = nbateam.eloRating;
    const eloChange = -5;
    nbateam.changeEloRating("002123", eloChange, true, opponent);

    // elo rating history always includes the current rating
    expect(nbateam.eloRating).toBe(preElo + eloChange);
    expect(nbateam.eloRatingHistory.length).toBe(2);
    expect(nbateam.eloRatingHistory[0]).toBe(preElo);
    expect(nbateam.eloRatingHistory[1]).toBe(preElo + eloChange);
    done();
  });
});
