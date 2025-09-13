import api from "../configs/api";
import { getCookie } from "../utils/cookies";

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const res = await api.post("auth/check-refresh-token", { refreshToken });
    return { response: res };
  } catch (error) {
    return { error };
  }
};

export default getNewToken;
