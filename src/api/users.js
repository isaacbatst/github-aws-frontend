import api from "./";

export const GET = ({ username }) => api.get(`/users/${username}`);
