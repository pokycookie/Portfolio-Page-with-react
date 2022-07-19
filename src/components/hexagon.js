export default function Hexagon(props) {
  const s = props.size;
  const w = s / (2 * Math.sqrt(3));

  return (
    <svg width={4 * w} height={s} style={props.style} className="hexagon">
      <polygon
        points={`${w},0 ${3 * w},0 ${4 * w},${s / 2} ${
          3 * w
        },${s} ${w},${s} 0,${s / 2}`}
        fill="blue"
      />
    </svg>
  );
}
