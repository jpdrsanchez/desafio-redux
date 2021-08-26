import { createSlice } from '@reduxjs/toolkit';
import getLocalstorage from './helpers/getLocalstorage';

const reducer = createSlice({
  name: 'login',
  initialState: {
    token: {
      loading: false,
      data: getLocalstorage('token', null),
      error: null,
    },
    user: {
      loading: false,
      data: null,
      error: null,
    },
  },
  reducers: {
    fetchTokenStarted(state) {
      state.token.loading = true;
    },
    fetchTokenSuccess: {
      reducer(state, action) {
        state.token.loading = false;
        state.token.data = action.payload;
        state.token.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: { localStorage: { key: 'token', value: payload.token } },
        };
      },
    },
    fetchTokenError(state, action) {
      state.token.loading = false;
      state.token.data = null;
      state.token.error = action.payload;
    },
    fetchUserStarted(state) {
      state.user.loading = true;
    },
    fetchUserSuccess(state, action) {
      state.user.loading = false;
      state.user.data = action.payload;
      state.user.error = null;
    },
    fetchUserError(state, action) {
      state.user.loading = false;
      state.user.data = null;
      state.user.error = action.payload;
    },
    userLogout(state) {
      state.user.loading = false;
      state.user.data = null;
      state.user.error = null;
    },
  },
});

export const {
  fetchTokenStarted,
  fetchTokenSuccess,
  fetchTokenError,
  fetchUserStarted,
  fetchUserSuccess,
  fetchUserError,
  userLogout,
} = reducer.actions;

export const fetchToken = (user) => async (dispatch) => {
  try {
    dispatch(fetchTokenStarted());
    const response = await fetch(
      'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    );

    const data = await response.json();
    return dispatch(fetchTokenSuccess(data));
  } catch (error) {
    return dispatch(fetchTokenError(error.message));
  }
};

export const fetchUser = (token) => async (dispatch) => {
  try {
    dispatch(fetchUserStarted());
    const response = await fetch('https://dogsapi.origamid.dev/json/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return dispatch(fetchUserSuccess(data));
  } catch (error) {
    return dispatch(fetchUserError(error.message));
  }
};

export const userLogin = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchToken(user));
    if (payload.token !== undefined) {
      await dispatch(fetchUser(payload.token));
    }
  } catch (error) {}
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.login.token.data;
  if (token) await dispatch(fetchUser(token));
};

export default reducer.reducer;
