import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import FollowersPage from "./pages/followers";

export default function Routes() {
  return (
    <Switch>
      <Route path="/followers">
        <FollowersPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}
