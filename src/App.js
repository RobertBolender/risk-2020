import React from "react";
import { Random } from "./Random";

const SEED = 422111495; // https://xkcd.com/221/

const PRNG = new Random(SEED);

const coinFlip = () => PRNG.next() % 2 === 0;
const headsOrTails = () => (coinFlip() ? "Heads" : "Tails");

export const App = () => {
  const results = Array.from({ length: 20 }).map(() => headsOrTails());
  const winCountPlayerA = results.filter(x => x === "Heads").length;
  const winCountPlayerB = results.filter(x => x === "Tails").length;
  return (
    <div>
      <h1>R.I.S.K. 2020</h1>
      <h2>Rules</h2>
      <p>
        Player A goes first. Player A flips a coin. If 'Heads', Player A wins.
        If 'Tails', Player B wins.
      </p>
      <h2>Results</h2>
      <p>Player A won: {formatTimes(winCountPlayerA)}</p>
      <p>Player B won: {formatTimes(winCountPlayerB)}</p>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

function formatTimes(number) {
  return number === 1 ? `${number} time` : `${number} times`;
}
