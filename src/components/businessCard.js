import { useEffect, useState } from "react";
import { useWindows } from "../hooks";

export default function BusinessCard(props) {
  const [offset, setOffset] = useState(false);
  const windows = useWindows();

  const onMouseMove = (e) => {
    const result = { x: e.clientX, y: e.clientY };
    setOffset(result);
  };
  const onMouseLeave = () => {
    setOffset(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const rev =
    props.reverse !== undefined && props.reverse === true ? true : false;

  const DEG = 20;
  const FLIP = props.isFlip ? (rev ? -180 : 0) : rev ? 0 : 180;

  const width = windows.x / 3;
  const height = windows.y / 3;
  const x =
    offset.x < width
      ? -DEG + FLIP
      : offset.x > 2 * width
      ? DEG + FLIP
      : 0 + FLIP;
  const y = offset.y < height ? DEG : offset.y > 2 * height ? -DEG : 0;

  const flipCard = () => {
    props.setIsFlip(props.isFlip ? false : true);
  };

  const styles = { transform: `rotateX(${y}deg) rotateY(${x}deg)` };

  return (
    <div
      className={`businessCard ${props.className}`}
      onClick={flipCard}
      style={styles}
    >
      {props.children}
    </div>
  );
}
