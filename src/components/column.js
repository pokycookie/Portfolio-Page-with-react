export default function Column(props) {
  return (
    <div
      className="column"
      style={{ width: props.size.x, height: props.size.y }}
    >
      {props.children}
    </div>
  );
}
