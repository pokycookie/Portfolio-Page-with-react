import { useEffect } from "react";
import { useState } from "react";

export function useOffset(ref, options) {
  const [isEnter, setIsEnter] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const getOffset = (e) => {
    setIsEnter(true);
    setX(e.offsetX + (options?.width || 0));
    setY(e.offsetY + (options?.height || 0));
  };

  const getClient = (e) => {
    setIsEnter(true);
    setX(e.clientX);
    setY(e.clientY);
  };

  const mouseLeave = () => {
    setIsEnter(false);
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.addEventListener("mousemove", (e) => {
        getOffset(e);
      });
      ref.current.addEventListener("mouseleave", mouseLeave);
    } else {
      window.addEventListener("mousemove", (e) => {
        getClient(e);
      });
      document.addEventListener("mouseleave", mouseLeave);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return isEnter ? { x, y } : false;
}

export function useWindows(DOM) {
  const [size, setSize] = useState({ x: 1, y: 1 });

  const handleResize = () => {
    setSize(
      DOM
        ? {
            x: DOM.current?.clientWidth || 1,
            y: DOM.current?.clientHeight || 1,
          }
        : {
            x: window.innerWidth || 1,
            y: window.innerHeight || 1,
          }
    );
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
