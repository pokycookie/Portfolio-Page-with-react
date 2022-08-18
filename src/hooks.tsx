import { useEffect, useRef } from "react";
import { useState } from "react";
import { ICoord } from "./types";

export function useWindowSize(): ICoord {
  const [size, setSize] = useState<ICoord>({ x: 1, y: 1 });

  const handleResize = () => {
    setSize({
      x: window.innerWidth || 1,
      y: window.innerHeight || 1,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
}

type ICallback = () => void;

export function useInterval(callback: ICallback, delay: number | null) {
  const currentFn = useRef<ICallback>(callback);

  useEffect(() => {
    currentFn.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = () => currentFn.current();
    if (delay !== null) {
      const interval = setInterval(handler, delay);
      return () => clearInterval(interval);
    }
  });
}
