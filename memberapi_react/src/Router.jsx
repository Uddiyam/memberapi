import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/SignUp" element={<SignUp />} />
      <Route exact path="/Home" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
