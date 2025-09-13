import api from "../configs/api";

const fetchCategories = async () => {
  try {
    const res = await api.get("/category");
    return { response: res };
  } catch (error) {
    return { error };
  }
};

export default fetchCategories;
