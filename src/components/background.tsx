import { useWindows } from "../hooks";
import { ICoord } from "../types";
import Wave from "./wave";
import "../scss/background.scss";

interface IProps {
  dive?: boolean;
}

export default function Background(props: IProps) {
  const windows: ICoord = useWindows();

  return (
    <div className="background">
      <Waves
        windows={windows}
        count={5}
        complex={3}
        contrast={200}
        dive={props.dive}
      />
    </div>
  );
}

interface IWavesProps {
  windows: ICoord;
  count: number;
  complex: number;
  contrast: number;
  dive?: boolean;
}

function Waves(props: IWavesProps) {
  const render: JSX.Element[] = [];
  const gap = 50;
  const height = window.screen.height;
  const width = 1500;

  for (let count = 0; count < props.count; count++) {
    const offset = height - 500 + props.count * gap - count * gap;

    render.push(
      <Wave
        key={count}
        width={width}
        height={height}
        offset={props.dive ? -200 : offset}
        complexity={props.complex}
        contrast={props.contrast}
        color={`hsl(264, ${100 - count * 10}%, 50%)`}
        opacity={0.6}
        repeat={Math.ceil(window.screen.width / width)}
      />
    );
  }

  return <>{render}</>;
}
