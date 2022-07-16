export default function Column(props) {
  const f = props.floor;
  const c = props.count;
  const s = props.size.y;
  const top = f === c ? 0 : f > c ? -s : s;

  return (
    <div
      className={`column ${props.className}`}
      style={{
        width: props.size.x,
        height: props.size.y,
        top,
      }}
    >
      {props.children}
    </div>
  );
}
