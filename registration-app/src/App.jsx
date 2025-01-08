import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Home from "./Home"; 

const App = () => {
  const getUserFromStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home user={getUserFromStorage()} />} />
      </Routes>
    </Router>
  );
};

export default App;
