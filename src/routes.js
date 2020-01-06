import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import DonatePage from "./pages/donate";

export default function Routes() {
  return (
    <Switch>
      <Route path="/donate">
        <DonatePage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}
