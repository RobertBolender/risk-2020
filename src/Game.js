const MAX_ATTACKS_PER_TURN = 100; // just in case

export const Game = (d6PlayerA, d6PlayerB) => {
  let activePlayer = "A";
  let armiesPlayerA = 10;
  let armiesPlayerB = 10;

  const actions = [];
  for (
    let attacksThisTurn = 0;
    attacksThisTurn < MAX_ATTACKS_PER_TURN;
    attacksThisTurn + 1
  ) {
    const resultPlayerA = d6PlayerA.roll();
    const resultPlayerB = d6PlayerB.roll();
    const won =
      activePlayer === "A"
        ? resultPlayerA > resultPlayerB
          ? "A"
          : "B"
        : resultPlayerB > resultPlayerA
        ? "B"
        : "A";

    actions.push({
      type: "battle",
      activePlayer,
      resultPlayerA,
      resultPlayerB,
      won
    });

    if (won === activePlayer) {
      if (activePlayer === "A") {
        if (--armiesPlayerB <= 0) {
          actions.push({
            type: "game",
            won
          });
          break;
        }
      } else {
        if (--armiesPlayerA <= 0) {
          actions.push({
            type: "game",
            won
          });
          break;
        }
      }
    } else {
      if (activePlayer === "A") {
        if (--armiesPlayerA <= 0) {
          actions.push({
            type: "turn",
            player: "B"
          });
          attacksThisTurn = 0;
          armiesPlayerB += 3;
          activePlayer = "B";
        }
      } else {
        if (--armiesPlayerB <= 0) {
          actions.push({
            type: "turn",
            player: "A"
          });
          attacksThisTurn = 0;
          armiesPlayerA += 3;
          activePlayer = "A";
        }
      }
    }
  }

  return actions;
};
