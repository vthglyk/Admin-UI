import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UserRolesReducer from "./user-roles-reducer";
import UserRegistrationReducer from "./user-registration-reducer";
import UserLoginReducer from "./user-login-reducer";
import UserLogoutReducer from "./user-logout-reducer";
import ModalReducer from "./modal-reducer";
import PlatformDeleteModalReducer from "./delete-platform--modal-reducer";
import PlatformConfigModalReducer from "./config-platform--modal-reducer";
import InfoModelDeleteModalReducer from "./delete-info-model-modal-reducer";
import InformationModelReducer from "./information-models-reducer";
import UserPlatforms from "./user-platforms-reducer";

const rootReducer = combineReducers({
    userRoles: UserRolesReducer,
    userRegistrationState: UserRegistrationReducer,
    userLoginState: UserLoginReducer,
    userLogoutState: UserLogoutReducer,
    modalState: ModalReducer,
    platformDeleteModal: PlatformDeleteModalReducer,
    platformConfigModal: PlatformConfigModalReducer,
    infoModelDeleteModal: InfoModelDeleteModalReducer,
    informationModels: InformationModelReducer,
    userPlatforms: UserPlatforms,
    form: formReducer
});

export default rootReducer;
