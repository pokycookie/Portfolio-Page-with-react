import { useEffect, useState } from "react";
import { useWindows } from "../hooks";

export default function Background() {
  const windows = useWindows();

  return (
    <div className="background">
      <svg width={windows.x} height={windows.y}>
        <EX1 windows={windows} />
        <EX2 windows={windows} count={3} complex={10} />
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
  const yOffset = y / 1.5;
  const waveGap = 100;
  const contrast = 100;

  const [waveForm, setWaveForm] = useState([""]);

  const getRandomPath = () => {
    const wavePos = [];
    for (let count = 0; count < props.count; count++) {
      wavePos.push([]);
      wavePos[count].push({ x: 0, y: yOffset + count * waveGap + Math.random() * contrast });

      for (let complex = 0; complex < props.complex; complex++) {
        const gap = x / props.complex;
        const max = gap * (complex + 1);
        const min = max - gap;
        const xPos = Math.random() * (max - min) + min;
        const yPos = yOffset + count * waveGap + Math.random() * contrast;
        wavePos[count].push({ x: xPos, y: yPos });
      }
      wavePos[count].push({ x, y: yOffset + count * waveGap + Math.random() * contrast });
    }
    pathConcat(wavePos);
  };

  useEffect(() => {
    getRandomPath();
  }, [props]);

  const pathConcat = (wavePos) => {
    const tempArr = [...waveForm];
    for (let count = 0; count < props.count; count++) {
      let tempString = "";
      if (!Array.isArray(wavePos[count])) break;
      wavePos[count].forEach((element, index, arr) => {
        if (index === 0) {
          tempString = tempString.concat(`M0 ${y} L${element.x} ${element.y}`);
        } else if (index === arr.length - 1) {
          tempString = tempString.concat(`, L${element.x} ${element.y} L${x} ${y} Z`);
        } else {
          tempString = tempString.concat(`, L${element.x} ${element.y}`);
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
            return <path d={element} fill="red" key={index} fillOpacity="0.3" />;
          })
        : null}
    </g>
  );
}
