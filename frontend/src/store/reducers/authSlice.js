import { createSlice } from '@reduxjs/toolkit';
import { localStorageWrapper, sessionStorageWrapper } from '../../utils/storage';

const initialState = {
    user: null,
    token: localStorageWrapper.getItem('token'),
    isLoggedIn: false,
    isLoggingIn: false,
    isLoggingOut: false,
    remember: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest(state) {
            state.isLoggingIn = true;
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoggingIn = false;
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            if (state.remember) {
                localStorageWrapper.setItem('token', action.payload.token);
            } else {
                sessionStorageWrapper.setItem('token', action.payload.token);
            }
        },
        loginFailure(state, action) {
            state.error = action.payload;
            state.isLoggingIn = false;
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            localStorageWrapper.removeItem('token');
            sessionStorageWrapper.removeItem('token');
        },
        logoutRequest(state) {
            state.isLoggingOut = true;
        },
        logoutSuccess(state) {
            state.isLoggingOut = false;
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            state.error = null;
            localStorageWrapper.removeItem('token');
            sessionStorageWrapper.removeItem('token');
        },
        logoutFailure(state) {
            state.isLoggingOut = false;
        },
        setRemember(state, action) {
            state.remember = action.payload;
        }
    },
});

export default authSlice.reducer;
export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    setRemember,
} = authSlice.actions;
