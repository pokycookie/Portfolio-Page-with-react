export default function ColumnNav(props) {
  const c = props.count;
  const count = c && typeof c === "number" ? c : 0;

  const mapArr = [];
  for (let i = 0; i < count; i++) {
    mapArr.push(i);
  }

  return (
    <div className="columnNav" style={{ top: `${props.size.y / 2}px` }}>
      {mapArr.map((element, index) => {
        return (
          <div
            key={index}
            className="page"
            style={
              props.floor === index + 1 ? { backgroundColor: "white" } : null
            }
            onClick={() => {
              const floor = index + 1;
              props.setScroll(floor);
            }}
          ></div>
        );
      })}
    </div>
  );
}
