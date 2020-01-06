import api from "./";

export const get = ({ username }) => api.get(`/users/${username}/repos`);
