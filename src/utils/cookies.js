import Cookies from "js-cookie";

const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};

const removeCookie = (cookieName) => {
  return Cookies.remove(cookieName);
};

export { setCookie, getCookie, removeCookie };
