import React, { useEffect, useState } from "react";
import { useD6 } from "./useD6";
import { Game } from "./Game";

const GAMES_TO_PLAY = 20;
const PLAYER_A_SEED = 422111495; // https://xkcd.com/221/
const PLAYER_B_SEED = 594111422;

export const App = () => {
  const d6PlayerA = useD6(PLAYER_A_SEED);
  const d6PlayerB = useD6(PLAYER_B_SEED);

  const [results, setResults] = useState([]);

  useEffect(() => {
    const results = Array.from({ length: GAMES_TO_PLAY }).map(() => {
      const actions = Game(d6PlayerA, d6PlayerB);
      const won = actions[actions.length - 1].won;
      return {
        actions,
        won
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
      <dl>
        <dt>Board</dt>
        <dd>The board has two territories, they are adjacent to each other.</dd>
        <dt>Starting Armies</dt>
        <dd>Each player starts with 10 armies in a single territory.</dd>
        <dt>Turns</dt>
        <dd>
          Player A goes first. At the start of the turn, the active player gets
          3 new armies. The active player will attack with 1 army at a time
          until either the opponent is eliminated or only a single army remains
          in his own territory.
        </dd>
        <dt>Battles</dt>
        <dd>
          Each player rolls 1d6. If the attacker rolls higher than the defender,
          the defender loses 1 army. Otherwise, the attacker loses 1 army. The
          defender wins ties.
        </dd>
      </dl>
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

function formatGameSummary({ won, actions }) {
  return `Player ${won} won after ${actions.length} actions.\n${JSON.stringify(
    actions
  )}`;
}
