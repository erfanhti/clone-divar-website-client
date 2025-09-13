import api from "../configs/api";

const getProfile = async () =>
  await api.get("user/whoami").then((res) => res || null);

const getPosts = async () => await api.get("post/my");

const getAllPosts = async () => await api.get("");

const deleteCategoryById = async (id) => await api.delete(`category/${id}`);

export { getProfile, getPosts, getAllPosts, deleteCategoryById };
