import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Schedule from "./pages/Schedule";
import ScheduleMatchDetail from "./pages/ScheduleMatchDetail";
import Probabilities from "./pages/Probabilities";
import ProbabilityMatchDetail from "./pages/ProbabilityMatchDetail";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import UserPortal from "./pages/UserPortal";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import AdminPortal from "./pages/AdminPortal";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMatches from "./pages/AdminMatches";
import AdminUsers from "./pages/AdminUsers";
import AdminContent from "./pages/AdminContent";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<Layout />}>
                <Route path="/" element={<Landing />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/schedule/:match_id" element={<ScheduleMatchDetail />} />
      <Route path="/probabilities" element={<Probabilities />} />
      <Route path="/probabilities/:match_id" element={<ProbabilityMatchDetail />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/teams/:team_id" element={<TeamDetail />} />
      <Route path="/user" element={<UserPortal />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/settings" element={<UserSettings />} />
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/matches" element={<AdminMatches />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/content" element={<AdminContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;