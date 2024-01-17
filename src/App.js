import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from '../src/Components/Header/Index';
import MainSection from '../src/UserDeatils/index';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/About" element={<MainSection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
