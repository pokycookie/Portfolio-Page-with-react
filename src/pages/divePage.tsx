import { useState } from "react";
import { TPage } from "../types";
import "../scss/divePage.scss";
import Section from "../components/section";

interface IProps {
  setPage: React.Dispatch<React.SetStateAction<TPage>>;
}

export default function DivePage(props: IProps) {
  const [section, setSection] = useState("");

  return (
    <div className="divePage">
      <Section>
        <p>Dive</p>
      </Section>
    </div>
  );
}
