const parseJwt = (token) => {
  try {
    const base64Jwt = token.split('.')[1];
    const parsedJwt = JSON.parse(window.atob(base64Jwt));
    return parsedJwt;
  } catch (e) {
    return false;
  }
};

export default parseJwt;
