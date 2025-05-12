/**
 * This is a Next.js page.
 */
import React from "react";
import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const catsQuery = trpc.getCats.useQuery(undefined, { enabled: false });
  const dogsQuery = trpc.getDogs.useQuery(undefined, { enabled: false });

  const fetchBoth = () => {
    catsQuery.refetch();
    dogsQuery.refetch();
  };

  return (
    <div>
      <h2>Cats & Dogs</h2>
      <button
        onClick={fetchBoth}
        disabled={catsQuery.isLoading || dogsQuery.isLoading}
      >
        {catsQuery.isLoading || dogsQuery.isLoading
          ? "Loading..."
          : "Fetch Cats & Dogs"}
      </button>
      <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        <div>
          <h3>Cats</h3>
          {catsQuery.data && (
            <ul>
              {catsQuery.data.map((cat: string, i: number) => (
                <li key={i}>{cat}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3>Dogs</h3>
          {dogsQuery.data && (
            <ul>
              {dogsQuery.data.map((dog: string, i: number) => (
                <li key={i}>{dog}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
