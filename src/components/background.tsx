import { useEffect, useState } from "react";
import { useWindows } from "../hooks";

export default function Background() {
  const windows = useWindows();

  return (
    <div className="background">
      <svg width={windows.x} height={windows.y}>
        {/* <EX1 windows={windows} /> */}
        <EX2 windows={windows} count={15} complex={30} contrast={300} />
      </svg>
    </div>
  );
}

function EX1(props) {
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

function EX2(props) {
  const x = props.windows.x;
  const y = props.windows.y;
  const yOffset = 0;
  const waveGap = 50;
  const contrast = props.contrast;

  const [waveForm, setWaveForm] = useState([""]);
  const [wavePos2, setWavePos2] = useState([]);
  const [assist2, setAssist2] = useState([]);

  useEffect(() => {
    getRandomPath();
  }, [props.count, props.complex, props.windows]);

  const getRandomPath = () => {
    const wavePos = [];
    const assist = [];
    for (let count = 0; count < props.count; count++) {
      wavePos.push([]);
      assist.push([]);

      for (let complex = 0; complex < props.complex; complex++) {
        const gap = complex === 0 ? 0 : x / props.complex;
        const max = gap * complex;
        const min = max - gap;
        // const xPos = Math.random() * (max - min) + min;
        const xPos = (max - min) / 2 + min;
        const yPos = yOffset + count * waveGap + Math.random() * contrast;
        wavePos[count].push({ x: Math.floor(xPos), y: Math.floor(yPos) });
        if (complex > 0) {
          const prevX = wavePos[count][complex - 1].x || 0;
          const prevY = wavePos[count][complex - 1].y || 0;
          const currentX = wavePos[count][complex].x || 0;
          const currentY = wavePos[count][complex].y || 0;
          const x12 = prevX + (currentX - prevX) / 2;
          assist[count].push({
            x1: Math.floor(x12),
            y1: Math.floor(prevY),
            x2: Math.floor(x12),
            y2: Math.floor(currentY),
          });
        }
      }
      const prevX = wavePos[count][wavePos[count].length - 1].x || 0;
      const prevY = wavePos[count][wavePos[count].length - 1].y || 0;
      const currentY = yOffset + count * waveGap + Math.random() * contrast;
      const x12 = prevX + (x - prevX) / 2;
      assist[count].push({
        x1: Math.floor(x12),
        y1: Math.floor(prevY),
        x2: Math.floor(x12),
        y2: Math.floor(currentY),
      });
      wavePos[count].push({ x: Math.floor(x), y: Math.floor(currentY) });
    }
    setWavePos2(wavePos);
    setAssist2(assist);
    pathConcat(wavePos, assist);
  };

  const pathConcat = (wavePos, assist) => {
    const tempArr = [];
    for (let count = 0; count < props.count; count++) {
      let tempString = "";
      if (!Array.isArray(wavePos[count])) break;
      wavePos[count].forEach((element, index, arr) => {
        if (index === 0) {
          tempString = tempString.concat(`M0,${y} L${element.x},${element.y}`);
        } else if (index === arr.length - 1) {
          tempString = tempString.concat(
            ` C${assist[count][index - 1].x1},${assist[count][index - 1].y1} ${
              assist[count][index - 1].x2
            },${assist[count][index - 1].y2} ${element.x},${element.y} L${x},${y} Z`
          );
        } else {
          tempString = tempString.concat(
            ` C${assist[count][index - 1].x1},${assist[count][index - 1].y1} ${
              assist[count][index - 1].x2
            },${assist[count][index - 1].y2} ${element.x},${element.y}`
          );
        }
      });
      tempArr[count] = tempString;
    }
    setWaveForm(tempArr);
  };

  return (
    <g>
      {Array.isArray(waveForm)
        ? waveForm.map((element, index) => {
            return (
              <path
                d={element}
                fill={`hsl(${index * 30}deg, 100%, 50%)`}
                key={index}
                fillOpacity="0.5"
              />
            );
          })
        : null}
      {/* {Array.isArray(wavePos2)
        ? wavePos2.map((element) => {
            if (Array.isArray(element)) {
              return element.map((e, index) => {
                return <circle key={index} cx={e.x} cy={e.y} r="5" fill="white" />;
              });
            }
          })
        : null}
      {Array.isArray(assist2)
        ? assist2.map((element) => {
            if (Array.isArray(element)) {
              return element.map((e, index) => {
                return (
                  <g key={index}>
                    <circle cx={e.x1} cy={e.y1} r="3" fill="blue" />
                    <circle cx={e.x2} cy={e.y2} r="3" fill="blue" />;
                  </g>
                );
              });
            }
          })
        : null} */}
    </g>
  );
}
