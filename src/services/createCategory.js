import api from "../configs/api";

const createCategory = async (data) => {
  try {
    const response = await api.post("category", data);
    return { response };
  } catch (error) {
    return { error };
  }
};

export { createCategory };
