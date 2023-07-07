import { combineReducers } from 'redux';
import authReducer from './reducers/authSlice';
import registerReducer from './reducers/registerSlice';
import forgotPasswordReducer from './reducers/forgotPasswordSlice';
import cardsReducer from './reducers/cardsSlice';
import newPassword from './reducers/newPasswordSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    newPassword: newPassword,
    forgotPassword: forgotPasswordReducer,
    cards: cardsReducer,
});

export default rootReducer;