import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Routes from "./routes";
import AppLayout from "./components/AppLayout";

import './index.css';

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
