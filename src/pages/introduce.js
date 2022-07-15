import { useEffect, useState } from "react";
import Column from "../components/column";

export default function Introduce() {
  const [floor, setFloor] = useState(0);
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const onWheel = (e) => {
    if (e.deltaY > 0) {
      setFloor((prev) => prev + 1);
    } else {
      setFloor((prev) => prev - 1);
    }
    console.log(floor);
  };
  const onResize = () => {
    const result = { x: window.innerWidth, y: window.innerHeight };
    setSize(result);
  };

  useEffect(() => {
    window.scrollTo({ top: size.y * floor, behavior: "smooth" });
  }, [floor]);

  useEffect(() => {
    window.addEventListener("wheel", onWheel);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="introducePage">
      <Column size={size} />
      <Column size={size} />
      <Column size={size} />
      <Column size={size} />
      <Column size={size} />
    </div>
  );
}
