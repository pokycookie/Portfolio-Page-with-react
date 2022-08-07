import { useWindows } from "../hooks";
import { ICoord } from "../types";
import Wave from "./wave";

export default function Background() {
  const windows: ICoord = useWindows();

  return (
    <div className="background">
      <EX2 windows={windows} count={10} complex={20} contrast={200} />
    </div>
  );
}

interface IEX1 {
  windows: {
    x: number;
    y: number;
  };
}

function EX1(props: IEX1) {
  const x = props.windows.x;
  const y = props.windows.y;

  return (
    <g>
      <path
        d={`M0 ${y / 2} Q${x / 2} ${y / 3}, ${x} ${y / 2} L${x} ${y} L0 ${y} Z`}
        fill="#A149FA"
      />
      <path
        d={`M0 0 L0 ${y / 1.2} C${x / 2} ${y / 2.5}, ${x / 1.3} ${y / 3}, ${x} ${
          y / 1.5
        } L${x} 0 Z`}
        fill="#3F4E4F"
      />
      <path d={`M0 0 L${x / 2} 0 Q${x / 2} ${y / 2}, 0 ${y / 2} Z`} fill="#D61C4E" />
      <path d={`M0 0 Q${x / 1.4} ${y / 5}, ${x} ${y / 1.5} L${x} 0  Z`} fill="#3AB4F2" />
      <path d={`M0 ${y / 2} Q${x / 10} ${y}, ${x / 1.5} ${y} L0 ${y} Z`} fill="#E8AA42" />
      <path
        d={`M${x / 1.5} ${y} Q${x / 1.5} ${y / 1.5}, ${x} ${y / 2} L${x} ${y} Z`}
        fill="#377D71"
      />
    </g>
  );
}

interface IEX2 {
  windows: ICoord;
  count: number;
  complex: number;
  contrast: number;
}

function EX2(props: IEX2) {
  const render: JSX.Element[] = [];
  const gap = 50;
  const height = 800;

  for (let count = 0; count < props.count; count++) {
    render.push(
      <Wave
        key={count}
        width={5000}
        height={height}
        windows={props.windows}
        offset={props.count * gap - count * gap}
        complexity={props.complex}
        contrast={props.contrast}
        color={`hsl(${count * 20}, 100%, 50%)`}
        opacity={0.5}
        duration={Math.random() * 10 + 20}
      />
    );
  }

  return <div>{render}</div>;
}