import React, { useState, useEffect } from "react";
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
      orderAndSetRepos(repos);
      setErrorFetching(null);
    } catch (error) {
      setErrorFetching("User couldn't be found")
    } finally {
      setIsFetchingRepos(false);
      setIsFetchingUser(false);
    }
  };

  const requestUser = async () => {
    setIsFetchingUser(true);
    const response = await Users.GET({ username: input });
    return response.data.user;
  };

  const requestRepos = async () => {
    setIsFetchingRepos(true);
    const response = await Repos.GET({ username: input });
    return response.data.repos;
  };

  const orderAndSetRepos = repos => {
    setRepos(
      repos.sort((repoA, repoB) => {
        const dateRepoA = new Date(repoA.updated_at).getTime();
        const dateRepoB = new Date(repoB.updated_at).getTime();

        if (dateRepoA > dateRepoB) {
          return -1;
        }

        if (dateRepoB > dateRepoA) {
          return 1;
        }

        return 0;
      })
    );
  };

  const handleInputChange = ({ target }) => {
    setInput(target.value);
  };

  const handleEditSubmit = async ({ currentRepo, newRepoProps }) => {
    try {
      const {
        data: { repo }
      } = await Repos.PATCH({
        newRepoProps,
        path: {
          repo: currentRepo.name,
          username: user.login
        }
      });

      setRepos(
        repos.map(iteratedRepo => {
          if (iteratedRepo.id === currentRepo.id) {
            return repo;
          }
          return iteratedRepo;
        })
      );

    } catch (error) {
      setErrorFetching(error.message)
    }
  };

  return (
    <>
      <div>
        {errorFetching && <Alert message={errorFetching} closable type="error" />}
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
        {repos && (
          <ReposCol handleEditSubmit={handleEditSubmit} repos={repos} />
        )}
      </Row>
    </>
  );
}
