import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserRolesReducer from './user-roles-reducer';
import UserRegistrationReducer from './user-registration-reducer';

const rootReducer = combineReducers({
    userRoles: UserRolesReducer,
    userRegistration: UserRegistrationReducer,
    form: formReducer
});

export default rootReducer;
