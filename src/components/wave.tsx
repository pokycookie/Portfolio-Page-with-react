import { useEffect, useState } from "react";
import { ICoord } from "../types";

interface IProps {
  width: number;
  height: number;
  complexity: number;
  contrast: number;
  offset: number;
  color: string;
  opacity?: number;
  repeat?: number;
}

export default function Wave(props: IProps) {
  const height = props.height;
  const offset = props.offset;
  const contrast = props.contrast;

  const [entryHeight, setEntryHeight] = useState<number>(
    getHeight(height, offset, contrast)
  );
  const [path, setPath] = useState("");
  const [repeatArr, setRepeatArr] = useState<number[]>([]);

  // gap between coord (horizontal)
  const gap = props.width / (props.complexity + 1);
  // c1 or c2 position
  const DIFFC = gap / 2;

  // Initialize entryHeight
  useEffect(() => {
    const height = getHeight(props.height, offset, contrast);
    setEntryHeight(height);
    const interval = window.setInterval(() => {
      const height = getHeight(props.height, offset, contrast);
      setEntryHeight(height);
    }, Math.random() * 2000 + 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Set path
  useEffect(() => {
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
        const y = getHeight(height, offset, contrast);
        pathString = concatPath(pathString, { x, y }, DIFFC);
      }
    }
    pathString = pathString.concat(`L ${props.width} ${props.height} Z`);

    // Set path state
    setPath(pathString);
  }, [
    entryHeight,
    DIFFC,
    contrast,
    gap,
    height,
    offset,
    props.complexity,
    props.height,
    props.width,
  ]);

  // Change repeat array
  useEffect(() => {
    const tempArr: number[] = [];
    if (props.repeat) {
      for (let repeat = 0; repeat < props.repeat; repeat++) {
        tempArr.push(repeat);
      }
    } else {
      tempArr.push(0);
    }
    setRepeatArr(tempArr);
  }, [props.repeat]);

  return (
    <>
      {typeof props.repeat === "undefined" ? (
        <svg width={props.width} height={props.height}>
          <path
            d={path}
            fill={props.color}
            fillOpacity={props.opacity ? props.opacity : 1}
          />
        </svg>
      ) : (
        repeatArr.map((element) => {
          return (
            <svg
              width={props.width}
              height={props.height}
              key={element}
              style={{ left: props.width * element }}
            >
              <path
                d={path}
                fill={props.color}
                fillOpacity={props.opacity ? props.opacity : 1}
              />
            </svg>
          );
        })
      )}
    </>
  );
}

// Get random height
const getHeight = (height: number, offset: number, contrast: number) => {
  return height - offset - contrast * Math.random();
};

// Concat path string
const concatPath = (prev: string, end: ICoord, DIFFC: number) => {
  const c1: ICoord = { x: end.x - DIFFC, y: end.y };
  const c2: ICoord = { x: end.x + DIFFC, y: end.y };
  return prev.concat(` ${c1.x} ${c1.y} ${end.x} ${end.y} C ${c2.x} ${c2.y}`);
};
