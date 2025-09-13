import api from "../configs/api";

const deletePost = async (id) => {
  await api.delete(`post/delete/${id}`);
};

export default deletePost;
