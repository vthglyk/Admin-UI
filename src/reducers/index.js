import { combineReducers } from 'redux';
import SelectUserRoleReducer from './select-user-role-reducer';

const rootReducer = combineReducers({
    selectedUserRole: SelectUserRoleReducer
});

export default rootReducer;
