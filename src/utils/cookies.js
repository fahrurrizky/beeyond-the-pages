import parseJwt from './parse-jwt';

const setCk = function setCookie(cName, value, { datetime, iso8601 }, secure = false) {
  const d = new Date();
  if (datetime) d.setTime(datetime);
  if (iso8601) d.setTime(iso8601);
  const cValue = secure ? window.btoa(value) : value;
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cName}=${cValue};${expires};path=/;`;
};

const getCk = function getCookie(cName, secure = false) {
  const name = `${cName}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return secure ? window.atob(c.substring(name.length, c.length)) : c.substring(name.length, c.length);
    }
  }
  return '';
};

const checkCk = function checkCookie(cName) {
  const user = getCk(cName);
  if (user !== '') {
    return true;
  }
  return false;
};

const delCk = function deleteCookie(cName) {
  setCk(cName, '', -1);
};

const certDetail = function getCertDetail() {
  const token = getCk('CERT');
  if (token) {
    const { c, ci, i, e, r, exp } = parseJwt(token);
    if (c === undefined) delCk('CERT');
    return {
      id: c,
      email: e,
      role: r?.id,
      roleName: r?.name,
      suppId: ci,
      employeeId: i,
      exp,
    };
  }
  return {
    id: undefined,
    email: undefined,
    role: undefined,
    employeeId: undefined,
    exp: undefined,
  };
};

export { setCk, getCk, checkCk, delCk, certDetail };
