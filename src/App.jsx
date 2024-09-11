import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "./Pages/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Single from "./Pages/Single";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/:userId" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
