import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserRolesReducer from './user-roles-reducer';
import UserRegistrationReducer from './user-registration-reducer';
import UserLoginReducer from './user-login-reducer';
import ModalReducer from './modal-reducer';

const rootReducer = combineReducers({
    userRoles: UserRolesReducer,
    userRegistration: UserRegistrationReducer,
    userLogin: UserLoginReducer,
    modalState: ModalReducer,
    form: formReducer
});

export default rootReducer;
