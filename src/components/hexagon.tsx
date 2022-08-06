interface IProps {
  size: number;
  color: string;
  scroll: number;
  init: number;
  src: string;
}

export default function Hexagon(props: IProps) {
  const s = props.size;
  const w = s / (2 * Math.sqrt(3));

  const styled = () => {
    return {
      clipPath: `path('M${w} 0 L${3 * w} 0 L${4 * w} ${s / 2} L${3 * w} ${s} L${w} ${s} L0 ${
        s / 2
      } Z')`,
      backgroundColor: `#${props.color || "FFFFFF"}`,
      width: 4 * w,
      height: s,
      margin: 0.288 * s + 10,
      // animation: `rotateFront 2s`,
    };
  };

  return (
    <div className="hexagon" style={styled()}>
      <div style={styled()}>
        <img src={props.src} alt="js" width={4 * w} height={s} />
      </div>
    </div>
  );
}
