import api from "./";

export const GET = ({ username }) => api.get(`/users/${username}/repos`);
export const PATCH = ({ path: { username, repo }, newRepoProps }) =>
  api.patch(`/repos/${username}/${repo}`, newRepoProps);
export const DELETE = ({ username, repo }) =>
  api.delete(`/repos/${username}/${repo}`);
