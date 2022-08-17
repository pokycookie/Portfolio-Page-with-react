import { useState } from "react";
import submarine from "./img/submarine.svg";
import Background from "./components/background";
import PageSelector from "./components/pageSelector";
import { TPage } from "./types";

function App() {
  const [page, setPage] = useState<TPage>("surface");
  const [dive, setDive] = useState<boolean>(false);

  const diveHandler = () => {
    setDive((prev) => (prev ? false : true));
    setPage((prev) => (prev === "surface" ? "dive" : "surface"));
  };

  return (
    <div className="App">
      <PageSelector page={page} setPage={setPage} diveHandler={diveHandler} />
      <img
        className="submarine"
        src={submarine}
        alt="submarine"
        width={400}
        height={400}
      />
      <Background dive={dive} />
    </div>
  );
}

export default App;
