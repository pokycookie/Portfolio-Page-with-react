import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks";
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

  const [path, setPath] = useState<string>("");
  const [repeatArr, setRepeatArr] = useState<number[]>([]);

  // gap between coord (horizontal)
  const gap = props.width / (props.complexity + 1);
  // c1 or c2 position
  const DIFFC = gap / 2;

  useInterval(() => {
    getPathString();
  }, 3000);

  // Set path function
  const getPathString = useCallback(() => {
    const entryHeight = getHeight(height, offset, contrast);

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
    DIFFC,
    contrast,
    gap,
    height,
    offset,
    props.complexity,
    props.height,
    props.width,
  ]);

  // Initialize entryHeight
  useEffect(() => {
    // Start animation immediately
    setTimeout(() => {
      getPathString();
    }, 10);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Set path
  useEffect(() => {
    getPathString();
  }, [getPathString]);

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
  return offset + contrast * Math.random();
};

// Concat path string
const concatPath = (prev: string, end: ICoord, DIFFC: number) => {
  const c1: ICoord = { x: end.x - DIFFC, y: end.y };
  const c2: ICoord = { x: end.x + DIFFC, y: end.y };
  return prev.concat(` ${c1.x} ${c1.y} ${end.x} ${end.y} C ${c2.x} ${c2.y}`);
};
