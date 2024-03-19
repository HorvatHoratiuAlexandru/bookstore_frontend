import { useEffect, useCallback } from "react";

// Define the type for the effect function
type EffectFunction = () => void;

// Define the hook with TypeScript types
const useDebounce = (
  effect: EffectFunction,
  dependencies: any[],
  delay: number
): void => {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
};

export default useDebounce;
