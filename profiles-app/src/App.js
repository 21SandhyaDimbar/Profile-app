import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./Components/PageLayOut/TopBar";
import Home from "./Components/PageLayOut/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<TopBar />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
