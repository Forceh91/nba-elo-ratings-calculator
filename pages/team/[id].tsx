import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import TeamProfile from "../../src/frontend/components/teamprofile/teamprofile";

function TeamOverview() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`//localhost:8600/api/v1/teams/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        setError(true);
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.query]);

  return (
    <div className="container padded-container">
      {isLoading ? <div className="alert alert-info">Fetching team data</div> : ""}
      {!isLoading && error ? <div className="alert alert-danger">Unable to fetch team data</div> : ""}
      {!isLoading && data && <TeamProfile {...data} />}
    </div>
  );
}

export default TeamOverview;
