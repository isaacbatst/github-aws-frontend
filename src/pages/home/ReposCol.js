import React from "react";
import { Col, Row } from "antd";
import RepoCard from './RepoCard';

export default function ReposCol({ repos, handleEditSubmit, handleDeleteClick }) {
  return (
    <Col span={16} id="user-col">
      <Row gutter={8}>
        {repos.map(repo => (
          <Col key={repo.id} span={12} className="repo-inner-col">
            <RepoCard repo={repo} handleEditSubmit={handleEditSubmit} handleDeleteClick={handleDeleteClick} />
          </Col>
        ))}
      </Row>
    </Col>
  );
}
