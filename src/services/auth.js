import api from "../configs/api";

const sendOtp = async (mobile) => {
  try {
    const res = await api.post("auth/send-otp", { mobile });
    return { response: res };
  } catch (error) {
    return { error };
  }
};
const checkOtp = async (mobile, code) => {
  try {
    const res = await api.post("auth/check-otp", { mobile, code });
    return { response: res };
  } catch (error) {
    return { error };
  }
};

export { sendOtp, checkOtp };
