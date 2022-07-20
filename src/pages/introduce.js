import { useEffect, useState } from "react";
import Column from "../components/column";
import ColumnNav from "../components/columnNav";
import Hexagon from "../components/hexagon";

const SCROLL_LEN = 2000;
const COLUMN_LEN = 5;

export default function Introduce() {
  const [scroll, setScroll] = useState(0);
  const [floor, setFloor] = useState(1);
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const onScroll = () => {
    let tempFloor = Math.ceil(window.scrollY / SCROLL_LEN);
    tempFloor = tempFloor <= 0 ? 1 : tempFloor;
    setFloor(tempFloor);
    setScroll(window.scrollY);
  };
  const onResize = () => {
    const result = { x: window.innerWidth, y: window.innerHeight };
    setSize(result);
  };
  const moveScroll = (floor) => {
    window.scrollTo({
      top: (floor - 1) * SCROLL_LEN + 10,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="introducePage"
      style={{ width: size.x, height: SCROLL_LEN * (COLUMN_LEN + 1) }}
    >
      <Column size={size} floor={floor} count={1} className="about">
        <p>About Me</p>
      </Column>
      <Column size={size} floor={floor} count={2} className="skills">
        <p>Skills</p>
        <div className="iconArea">
          <Hexagon size={200} scroll={scroll} />
          <Hexagon size={200} scroll={scroll} />
          <Hexagon size={200} scroll={scroll} />
          <div className="bottom" style={{ top: 105 }}>
            <Hexagon size={200} scroll={scroll} />
            <Hexagon size={200} scroll={scroll} />
          </div>
          <div className="bottom" style={{ top: 210 }}>
            <Hexagon size={200} scroll={scroll} />
            <Hexagon size={200} scroll={scroll} />
            <Hexagon size={200} scroll={scroll} />
          </div>
        </div>
      </Column>
      <Column size={size} floor={floor} count={3} className="">
        3
      </Column>
      <Column size={size} floor={floor} count={4} className="">
        4
      </Column>
      <Column size={size} floor={floor} count={5} className="">
        5
      </Column>
      <ColumnNav
        count={COLUMN_LEN}
        size={size}
        floor={floor}
        moveScroll={moveScroll}
      />
    </div>
  );
}
