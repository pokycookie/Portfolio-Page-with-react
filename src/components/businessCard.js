import { useOffset, useWindows } from "../hooks";

export default function BusinessCard(props) {
  const offset = useOffset();
  const windows = useWindows();

  const DEG = 20;

  const width = windows.x / 3;
  const height = windows.y / 3;
  const x = offset.x < width ? -DEG : offset.x > 2 * width ? DEG : 0;
  const y = offset.y < height ? DEG : offset.y > 2 * height ? -DEG : 0;

  const styles = { transform: `rotateX(${y}deg) rotateY(${x}deg)` };

  return (
    <div className="businessCard" style={offset !== false ? styles : null}>
      {props.children}
    </div>
  );
}
