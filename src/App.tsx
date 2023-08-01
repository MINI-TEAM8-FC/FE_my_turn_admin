import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./components/login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
