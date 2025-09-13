import api from "../configs/api";
import { getCookie } from "../utils/cookies";

const token = getCookie("accessToken");

const createPost = async (formData) => {
  try {
    const res = await api.post("post/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${token}`,
      },
    });
    return { response: res };
  } catch (error) {
    return { error };
  }
};

export { createPost };
