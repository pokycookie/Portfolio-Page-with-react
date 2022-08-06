import { useEffect, useState } from "react";
import { useWindows } from "../hooks";
import { ICoord } from "../types";

interface IProps {
  reverse: boolean;
  isFlip: boolean;
  setIsFlip: (flip: boolean) => void;
  className: string;
  children: JSX.Element;
}

export default function BusinessCard(props: IProps) {
  const [offset, setOffset] = useState<ICoord | null>(null);
  const windows: ICoord = useWindows();

  const onMouseMove = (e: globalThis.MouseEvent) => {
    const result = { x: e.clientX, y: e.clientY };
    setOffset(result);
  };
  const onMouseLeave = () => {
    setOffset(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const rev = props.reverse === true ? true : false;

  const DEG = 20;
  const FLIP = props.isFlip ? (rev ? -180 : 0) : rev ? 0 : 180;

  const width = windows.x / 3;
  const height = windows.y / 3;
  let x = 0;
  let y = 0;

  if (offset !== null) {
    x = offset.x < width ? -DEG + FLIP : offset.x > 2 * width ? DEG + FLIP : 0 + FLIP;
    y = offset.y < height ? DEG : offset.y > 2 * height ? -DEG : 0;
  } else {
    x = FLIP;
  }

  const flipCard = () => {
    props.setIsFlip(props.isFlip ? false : true);
  };

  const styles = { transform: `rotateX(${y}deg) rotateY(${x}deg)` };

  return (
    <div className={`businessCard ${props.className}`} onClick={flipCard} style={styles}>
      {props.children}
    </div>
  );
}
