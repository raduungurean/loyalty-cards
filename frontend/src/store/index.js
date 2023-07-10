import { combineReducers } from 'redux';
import authReducer from './reducers/authSlice';
import registerReducer from './reducers/registerSlice';
import forgotPasswordReducer from './reducers/forgotPasswordSlice';
import cardsReducer from './reducers/cardsSlice';
import newPassword from './reducers/newPasswordSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    newPassword: newPassword,
    forgotPassword: forgotPasswordReducer,
    cards: cardsReducer,
});

export const setupStore = preloadedState => {
    if (preloadedState && preloadedState.cards) {
        console.log('*************************', preloadedState);
    }
    return configureStore({
        reducer: rootReducer,
        middleware: (m) => m(),
        preloadedState: preloadedState
    })
}
export default rootReducer;
