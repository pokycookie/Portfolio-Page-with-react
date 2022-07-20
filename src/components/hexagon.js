import IMG_JS from "../img/js.png";

export default function Hexagon(props) {
  const s = props.size;
  const w = s / (2 * Math.sqrt(3));

  const rotateY = (deg) => {
    return {
      transform: `rotateY(${typeof deg === "number" ? deg : 0}deg)`,
      clipPath: `path('M${w} 0 L${3 * w} 0 L${4 * w} ${s / 2} L${
        3 * w
      } ${s} L${w} ${s} L0 ${s / 2} Z')`,
    };
  };

  return (
    <div className="hexagon" style={{ margin: 0.288 * s + 10 }}>
      <img
        src={IMG_JS}
        alt="js"
        width={4 * w}
        height={s}
        style={
          props.scroll > 2000 && props.scroll < 3000
            ? rotateY(100 - (props.scroll - 2500) * 0.1)
            : props.scroll < 2000
            ? rotateY(180)
            : rotateY(0)
        }
      />
    </div>
  );
}
