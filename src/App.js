import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./Navbar";
import ReminderPage from "./Routing/Reminder";
import BulkPage from "./Routing/Bulk/Bulk";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import HomePage from "./Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>

        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/reminder" element={<ReminderPage />} />
          <Route path="/bulk" element={<BulkPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
