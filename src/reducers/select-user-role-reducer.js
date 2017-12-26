import { SELECT_USER_ROLE } from '../actions/index';

export default function(state = {}, action) {
    switch(action.type) {
        case SELECT_USER_ROLE:
            if (action.payload)
                return action.payload;
            else
                return state;
        default:
            return state;
    }
}