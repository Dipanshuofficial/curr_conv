import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import Rates from "./components/Rates";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
