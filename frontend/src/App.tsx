import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <div className="w-full min-h-screen flex justify-center bg-[#e8e8e8] relative">
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/preview/:username" element={<Preview />} */}
      </Routes>
    </div>
  );
};

export default App;