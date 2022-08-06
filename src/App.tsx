import { Route, Routes } from "react-router-dom";
import InitPage from "./pages/initPage";
import Introduce from "./pages/introduce";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Portfolio-Page-with-react" element={<InitPage />} />
        <Route path="/Portfolio-Page-with-react/introduce" element={<Introduce />} />
      </Routes>
    </div>
  );
}

export default App;
