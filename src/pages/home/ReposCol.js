import React from "react";
import { Col, Card, Row, Icon } from "antd";
import TimeAgo from "react-timeago";

export default function ReposCol({ repos }) {
  return (
    <Col span={16} id="user-col">
      <Row gutter={8}>
        {repos.map(repo => (
          <Col key={repo.id} span={12} className="repo-inner-col">
            <Card
              title={repo.name}
              actions={[
                <Icon type="github" key="github" className="repo-link" />,
                <Icon type="star" key="star" theme="filled" />
              ]}
            >
              <p>
                Last update: <TimeAgo date={repo.updated_at} />
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
}
