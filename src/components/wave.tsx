import { useEffect, useState } from "react";
import { ICoord } from "../types";

interface IProps {
  width: number;
  height: number;
  windows: ICoord;
  complexity: number;
  contrast: number;
  offset: number;
  color: string;
  duration: number;
  opacity?: number;
  left: number;
  entryHeight?: number,
}

export default function Wave(props: IProps) {
  const [entryHeight, setEntryHeight] = useState(props.entryHeight || 0);
  const [path, setPath] = useState("");

  const gap = props.width / (props.complexity + 1);
  // c1 or c2 position
  const DIFFC = gap / 2;

  // Initialize entryHeight
  useEffect(() => {
    if (props.entryHeight === undefined) {
      const height = getHeight();
      setEntryHeight(height);
    }
    const interval = window.setInterval(waveTransition, Math.random() * 3000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.height, props.offset, props.width]);

  // Set path
  useEffect(() => {
    setPaths();
  }, [entryHeight, props.complexity, props.contrast]);

  // Get random height
  const getHeight = () => {
    return props.height - props.offset - props.contrast * Math.random();
  };

  // Concat path string
  const concatPath = (prev: string, end: ICoord) => {
    const c1: ICoord = { x: end.x - DIFFC, y: end.y };
    const c2: ICoord = { x: end.x + DIFFC, y: end.y };
    return prev.concat(` ${c1.x} ${c1.y} ${end.x} ${end.y} C ${c2.x} ${c2.y}`);
  };

  //
  const waveTransition = () => {
    setPaths();
  };

  //
  const setPaths = () => {
    let pathString = `M 0 ${props.height} L 0 ${entryHeight} C ${DIFFC} ${entryHeight}`;

    for (let complex = 0; complex < props.complexity + 1; complex++) {
      if (complex === props.complexity) {
        // End Point
        const x = props.width;
        const y = entryHeight;
        pathString = pathString.concat(` ${x - DIFFC} ${y} ${x} ${y}`);
      } else {
        // Else
        const x = gap * (complex + 1);
        const y = getHeight();
        pathString = concatPath(pathString, { x, y });
      }
    }
    pathString = pathString.concat(`L ${props.width} ${props.height} Z`);

    // Set path state
    setPath(pathString);
  };

  return (
    <svg width={props.windows.x} height={props.height} style={{left: props.left}}>
      <style>
        {`@keyframes `}
      </style>
      <path
        d={path}
        fill={props.color}
        fillOpacity={props.opacity ? props.opacity : 1}
        // style={{ animation: `flow ${props.duration}s infinite alternate` }}
      />
    </svg>
  );
}
