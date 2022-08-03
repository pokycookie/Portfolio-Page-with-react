export default function SvgText(props) {
  return (
    <svg width="500" height="100">
      <defs>
        <clipPath id="circle">
          <circle cx="50%" cy="30%" r="80" />
        </clipPath>
      </defs>
      <g>
        <text
          fontSize="80"
          fontWeight="600"
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          opacity="0.5"
        >
          {props.children}
        </text>
        <text
          fontSize="80"
          fontWeight="600"
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          clipPath="url(#circle)"
        >
          {props.children}
        </text>
      </g>
    </svg>
  );
}
