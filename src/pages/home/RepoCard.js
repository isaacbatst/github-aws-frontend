import React, { useState } from "react";
import { Card, Icon, Form, Button } from "antd";
import TimeAgo from "react-timeago";
import * as Repos from "../../api/repos";
import RepoEditForm from "./RepoEditForm";

export default function RepoCard({ repo, handleEditSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleGithubClick = () => window.open(repo.html_url, "_blank");

  const handleDeleteClick = () => {};

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditAtCard = async payload => {
    setIsFetching(true);
    await handleEditSubmit(payload);
    setIsEditing(false);
    setIsFetching(false);
  };

  return isFetching ? (
    <Card className="loading-card">
      <Icon type="loading" />
    </Card>
  ) : (
    <Card
      title={repo.name}
      actions={[
        <Icon
          type="github"
          key="github"
          className="repo-link"
          onClick={handleGithubClick}
        />,
        <Icon
          type="edit"
          key="edit"
          className="repo-link"
          onClick={handleEditClick}
        />,
        <Icon type="close" key="close" onClick={handleDeleteClick} />
      ]}
    >
      {isEditing ? (
        <RepoEditForm repo={repo} handleEditSubmit={handleEditAtCard} />
      ) : (
        <p>
          Last update: <TimeAgo date={repo.updated_at} />
        </p>
      )}
    </Card>
  );
}
