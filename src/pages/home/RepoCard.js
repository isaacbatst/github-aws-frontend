import React from "react";
import { Card, Icon } from "antd";
import TimeAgo from "react-timeago";
import { auth } from "../../services/githubAuth/auth";

export default function RepoCard({ repo }) {

  return (
    <Card
      title={repo.name}
      actions={[
        <Icon type="github" key="github" className="repo-link" />,
        <Icon
          type="star"
          key="star"
          theme="filled"
        />
      ]}
    >
      <p>
        Last update: <TimeAgo date={repo.updated_at} />
      </p>
    </Card>
  );
}
