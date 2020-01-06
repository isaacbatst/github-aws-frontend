import React from "react";
import { Col, Card } from "antd";
import Meta from "antd/lib/card/Meta";
// import { Container } from './styles';

export default function UserCol({ user }) {
  return (
    <Col span={8} id="user-col">
      <Card
        hoverable
        cover={<img alt="user avatar" src={user.avatar_url} />}
      >
        <Meta title={user.login} description={user.html_url} />
      </Card>
    </Col>
  );
}
