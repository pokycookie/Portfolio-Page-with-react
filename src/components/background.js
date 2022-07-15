import { useWindows } from "../hooks";

export default function Background() {
  const windows = useWindows();

  return (
    <div className="background">
      <svg width={windows.x} height={windows.y}>
        <path
          d={`M0 ${windows.y / 3} L${windows.x} ${windows.y / 3} L${
            windows.x
          } ${windows.y} L0 ${windows.y} Z`}
          fill="#A149FA"
        />
        <path
          d={`M0 0 L0 ${windows.y / 1.2} C${windows.x / 2} ${
            windows.y / 2.5
          }, ${windows.x / 1.3} ${windows.y / 3}, ${windows.x} ${
            windows.y / 1.5
          } L${windows.x} 0 Z`}
          fill="#3F4E4F"
        />
        <path
          d={`M0 0 L${windows.x / 2} 0 L0 ${windows.y / 2} Z`}
          fill="#D61C4E"
        />
        <path
          d={`M0 0 L${windows.x} 0 L${windows.x} ${windows.y / 1.5} Z`}
          fill="#3AB4F2"
        />
        <path
          d={`M0 ${windows.y / 2.5} L${windows.x / 1.5} ${windows.y} L0 ${
            windows.y
          } Z`}
          fill="#E8AA42"
        />
        <path
          d={`M${windows.x / 2} ${windows.y} L${windows.x} ${windows.y} L${
            windows.x
          } ${windows.y / 2.5} Z`}
          fill="#377D71"
        />
      </svg>
    </div>
  );
}
