import { useEffect, useRef } from "react";

export const useFrame = (callback: () => void) => {
  const loopRef = useRef<number>();

  const update = () => {
    callback();
    loopRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (loopRef.current) return;
    loopRef.current = requestAnimationFrame(update);

    return () => {
      if (!loopRef.current) return;
      cancelAnimationFrame(loopRef.current);
    };
  }, []);
};
