import { combineReducers } from 'redux';
import SelectUserRoleReducer from './select-user-role-reducer';
import UserRolesReducer from './user-roles-reducer';

const rootReducer = combineReducers({
    selectedUserRole: SelectUserRoleReducer,
    userRoles: UserRolesReducer
});

export default rootReducer;
