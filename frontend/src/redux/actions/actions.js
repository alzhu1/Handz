import * as a from './actionTypes';

export const getToken = token => ({
  type: a.GET_TOKEN,
  token
});

export const getUsername = username => ({
  type: a.GET_USERNAME,
  username
});

export const isLoggedIn = bool => ({
  type: a.IS_LOGGED_IN,
  bool
});
