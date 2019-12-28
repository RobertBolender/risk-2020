import { useCallback, useEffect, useMemo, useRef } from "react";
import { Random } from "./Random";

export const useD6 = SEED => {
  const PRNG = useRef(null);
  useEffect(() => {
    PRNG.current = new Random(SEED);
  }, [SEED]);

  const roll = useCallback(() => {
    const result = PRNG.current.next();
    return (result % 6) + 1;
  }, []);

  const d6 = useMemo(
    () => ({
      roll
    }),
    [roll]
  );

  return d6;
};
