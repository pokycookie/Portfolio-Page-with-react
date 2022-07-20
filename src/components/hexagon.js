export default function Hexagon(props) {
  const s = props.size;
  const w = s / (2 * Math.sqrt(3));

  const rotateY = (deg) => {
    return {
      transform: `rotateY(${typeof deg === "number" ? deg : 0}deg)`,
      clipPath: `path('M${w} 0 L${3 * w} 0 L${4 * w} ${s / 2} L${3 * w} ${s} L${w} ${s} L0 ${
        s / 2
      } Z')`,
      backgroundColor: `#${props.color || "FFFFFF"}`,
      width: 4 * w,
      height: s,
    };
  };

  return (
    <div className="hexagon" style={{ margin: 0.288 * s + 10 }}>
      <div style={props.scroll > props.init ? rotateY(0) : rotateY(180)}></div>
      <img src={props.src} alt="js" style={props.scroll > props.init ? rotateY(0) : rotateY(180)} />
    </div>
  );
}
