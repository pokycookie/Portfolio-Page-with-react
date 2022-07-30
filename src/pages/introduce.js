import { useEffect, useState } from "react";
import Column from "../components/column";
import ColumnNav from "../components/columnNav";
import Hexagon from "../components/hexagon";

import IMG_HTML from "../img/html.png";
import IMG_CSS from "../img/css.png";
import IMG_JS from "../img/js.png";
import IMG_REACT from "../img/react.png";
import IMG_NODE from "../img/node.png";
import IMG_GIT from "../img/git.png";
import IMG_TS from "../img/ts.png";
import IMG_MONGODB from "../img/mongodb.png";
import EmptyHexagon from "../components/emptyHexagon";

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
    <div className="introducePage" style={{ width: size.x, height: SCROLL_LEN * (COLUMN_LEN + 1) }}>
      <Column size={size} floor={floor} count={1} className="about">
        <p>About Me</p>
      </Column>
      <Column size={size} floor={floor} count={2} className="skills">
        <p>Skills</p>
        <div className="iconArea">
          <div className="bottom">
            <EmptyHexagon size={200} />
            <Hexagon
              size={200}
              scroll={scroll}
              src={IMG_JS}
              init={SCROLL_LEN * 1 + 800}
              color="FFD600"
            />
            <Hexagon
              size={200}
              scroll={scroll}
              src={IMG_NODE}
              init={SCROLL_LEN * 1 + 1000}
              color="43853D"
            />
          </div>
          <div className="bottom" style={{ top: 105 }}>
            <Hexagon
              size={200}
              scroll={scroll}
              src={IMG_CSS}
              init={SCROLL_LEN * 1 + 700}
              color="0277BD"
            />
            <Hexagon
              size={200}
              scroll={scroll}
              src={IMG_REACT}
              init={SCROLL_LEN * 1 + 900}
              color="20232A"
            />
          </div>
          <div className="bottom" style={{ top: 210 }}>
            <Hexagon
              size={200}
              scroll={scroll}
              src={IMG_HTML}
              init={SCROLL_LEN * 1 + 600}
              color="E65100"
            />
            <Hexagon
              size={200}
              scroll={scroll}
              src={IMG_GIT}
              init={SCROLL_LEN * 1 + 1200}
              color="EAE9E1"
            />
            <Hexagon
              size={200}
              scroll={scroll}
              src={IMG_TS}
              init={SCROLL_LEN * 1 + 1300}
              color="1976D2"
            />
          </div>
          <div className="bottom" style={{ top: 315 }}>
            <EmptyHexagon size={200} />
            <Hexagon
              size={200}
              scroll={scroll}
              src={IMG_MONGODB}
              init={SCROLL_LEN * 1 + 1100}
              color="023430"
            />
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
      <ColumnNav count={COLUMN_LEN} size={size} floor={floor} moveScroll={moveScroll} />
    </div>
  );
}
