export default function SvgText(props) {
  return (
    <svg width="500" height="100" viewBox="0 0 500 100">
      <text
        fontSize="80"
        fontWeight="600"
        x="250"
        y="50"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {props.children}
      </text>
    </svg>
  );
}
