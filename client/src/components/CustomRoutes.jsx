import React from "react";
import { Route, Routes } from "react-router-dom";
import Vote from "./pages/Vote";
import Voter from "./pages/Voter";
import Candidate from "./pages/Candidate";
function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Vote />} />
      <Route path="/voter" element={<Voter />} />
      <Route path="/candidate/selection" element={<Candidate />} />
    </Routes>
  );
}

export default CustomRoutes;
