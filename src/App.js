import React, { useEffect, useState } from "react";
import { useD6 } from "./useD6";

const GAMES_TO_PLAY = 2000000;
const PLAYER_A_SEED = 422111495; // https://xkcd.com/221/
const PLAYER_B_SEED = 594111422;

export const App = () => {
  const d6PlayerA = useD6(PLAYER_A_SEED);
  const d6PlayerB = useD6(PLAYER_B_SEED);

  const [results, setResults] = useState([]);

  useEffect(() => {
    const results = Array.from({ length: GAMES_TO_PLAY }).map(() => {
      const resultPlayerA = d6PlayerA.roll();
      const resultPlayerB = d6PlayerB.roll();
      return {
        resultPlayerA,
        resultPlayerB,
        won: resultPlayerA > resultPlayerB ? "A" : "B"
      };
    });
    setResults(results);
  }, [d6PlayerA, d6PlayerB]);

  const winCountPlayerA = results.filter(x => x.won === "A").length;
  const winCountPlayerB = results.filter(x => x.won === "B").length;
  const advantagedPlayer =
    winCountPlayerA > winCountPlayerB
      ? "A"
      : winCountPlayerB > winCountPlayerA
      ? "B"
      : false;
  const advantagePercent = Math.abs(
    ((winCountPlayerA - winCountPlayerB) / GAMES_TO_PLAY) * 100
  );

  return (
    <div>
      <h1>R.I.S.K. 2020</h1>
      <h2>Rules</h2>
      <p>
        Player A goes first. Both players roll 1d6. If Player A rolls higher,
        Player A wins. Player B wins ties.
      </p>
      <h2>Results</h2>
      <p>Player A won: {formatTimes(winCountPlayerA)}</p>
      <p>Player B won: {formatTimes(winCountPlayerB)}</p>
      <p>
        {advantagedPlayer
          ? `Player ${advantagedPlayer} has a ${advantagePercent}% advantage.`
          : "Both players are evenly matched."}
      </p>
      <ul>
        {results.slice(0, 20).map((result, index) => (
          <li key={index}>{formatGameSummary(result)}</li>
        ))}
      </ul>
    </div>
  );
};

function formatTimes(number) {
  return number === 1 ? `${number} time` : `${number} times`;
}

function formatGameSummary({ won, resultPlayerA, resultPlayerB }) {
  return `Player ${won} won. Player A rolled ${resultPlayerA}, Player B rolled ${resultPlayerB}`;
}
