import React, { useState } from "react";
import { Card, Icon } from "antd";
import TimeAgo from "react-timeago";
import RepoEditForm from "./RepoEditForm";

export default function RepoCard({
  repo,
  handleEditSubmit,
  handleDeleteClick
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleGithubClick = () => window.open(repo.html_url, "_blank");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
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
          style={isEditing ? { color: "#ff7a45" } : {}}
          onClick={handleEditClick}
        />,
        <Icon
          type="close"
          key="close"
          onClick={() => handleDeleteClick({ repo })}
        />
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
