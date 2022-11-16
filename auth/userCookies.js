import cookies from 'js-cookie';

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth');
  if (!cookie) {
    var obj ={token:null}
    return obj;
  }
  return JSON.parse(cookie);
};

export const setUserCookie = user => {
  cookies.set('auth', user, {
    expires: 1 / 24
  });
};

export const removeUserCookie = () => cookies.remove('auth');

export const getOnBoardFromCookie = () => {
  const cookie = cookies.get('vezitaOnboarding');
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const setOnBoardCookie = token => {
  cookies.set('vezitaOnboarding', token);
};

export const removeOnBoardCookie = () => cookies.remove('vezitaOnboarding');

export const getUserIdFromCookie = () => {
  const cookie = cookies.get('UserId');
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const setUserIdCookie = id => {
  cookies.set('UserId', id);
};

export const removeUserIdCookie = () => cookies.remove('UserId');