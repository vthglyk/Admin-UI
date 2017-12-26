import _ from 'lodash';
import { FETCH_USER_ROLES } from '../actions/index';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_USER_ROLES:
            const userRoles = _.mapKeys(action.payload.data, "enumValue");
            return _.omit(userRoles, "NULL");
        default:
            return state;
    }
}