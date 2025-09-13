import api from "../configs/api";

const createCategory = async (data) => {
  try {
    const res = await api.post("category", data);
    return { response: res };
  } catch (error) {
    return { error };
  }
};

export { createCategory };
