export default function EmptyHexagon(props) {
  const s = props.size;
  const w = s / (2 * Math.sqrt(3));

  return (
    <div className="emptyHexagon" style={{ margin: 0.288 * s + 10, width: 4 * w, height: s }}></div>
  );
}
