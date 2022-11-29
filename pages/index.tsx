import React, { useState, useEffect } from "react";
import NBATeam from "../src/nbateam/nbateam";
import EloRatingsTable from "../src/frontend/components/elorating";

function EloRatings() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("//localhost:8600/api/v1/ratings")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <div>Fetching ELO ratings...</div>;
  if (!data) return <div>Unable to fetch ELO Ratings</div>;

  const teams: Array<NBATeam> = data?.ratings;
  return (
    <div className="container">
      <EloRatingsTable games={data.completedGames} teams={teams} />
    </div>
  );
}

export default EloRatings;
