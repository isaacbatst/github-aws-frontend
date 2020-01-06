import React, { useState } from "react";
import { Button, Input, Icon, Alert, Row } from "antd";

import "./style.css";
import * as Users from "../../api/users";
import * as Repos from "../../api/repos";
import UserCol from "./UserCol";
import ReposCol from "./ReposCol";

export default function home() {
  const [input, setInput] = useState("");
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);
  const [errorFetching, setErrorFetching] = useState(null);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleFormSubmit = event => {
    event.preventDefault();
    requestUserAndRepos();
  };

  const requestUserAndRepos = async () => {
    try {
      const [user, repos] = [await requestUser(), await requestRepos()];
      setUser(user);
      setRepos(repos);
    } catch (error) {
    } finally {
      setIsFetchingRepos(false);
      setIsFetchingUser(false);
    }
  };

  const requestUser = async () => {
    setIsFetchingUser(true);
    const response = await Users.get({ username: input });
    return response.data.user
  };

  const requestRepos = async () => {
    setIsFetchingRepos(true);
    const response = await Repos.get({ username: input });
    return response.data.repos
  };

  const handleInputChange = ({ target }) => {
    setInput(target.value);
  };

  return (
    <>
      <div>
        {errorFetching && <Alert message="User not found" type="warning" />}
        <p>Enter a Github's username</p>
        <form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Go ahead, put your username :P"
            value={input}
            onChange={handleInputChange}
            size="large"
          />
          <Button
            block
            id="button-search-user"
            disabled={isFetchingUser}
            htmlType="submit"
            size="large"
            type="primary"
          >
            {isFetchingUser ? <Icon type="loading" /> : "Search"}
          </Button>
        </form>
      </div>

      <Row id="user-row" gutter={10}> 
        {user && <UserCol user={user} />}
        {repos && <ReposCol repos={repos} />}
      </Row>
    </>
  );
}
