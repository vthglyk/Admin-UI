import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import UserRolesReducer from './user-roles-reducer';
import UserRegistrationReducer from './user-registration-reducer';
import UserLoginReducer from './user-login-reducer';
import UserLogoutReducer from './user-logout-reducer';
import ModalReducer from './modal-reducer';
import PlatformRegistrationReducer from './platform-registration-form-reducer';
import InformationModelReducer from './get-information-models-reducer';

const rootReducer = combineReducers({
    userRoles: UserRolesReducer,
    userRegistrationState: UserRegistrationReducer,
    userLoginState: UserLoginReducer,
    userLogoutState: UserLogoutReducer,
    modalState: ModalReducer,
    platformRegistrationForm: PlatformRegistrationReducer,
    informationModels: InformationModelReducer,
    form: formReducer
});

export default rootReducer;
