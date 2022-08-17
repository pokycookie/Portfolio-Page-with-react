import { useEffect, useState } from "react";

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

export default function Section(props: IProps) {
  const [top, setTop] = useState("100%");

  useEffect(() => {
    setTop("0px");
  }, []);

  return (
    <div className="section" style={{ top }}>
      {props.children}
    </div>
  );
}
