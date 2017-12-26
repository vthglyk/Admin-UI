import { SELECT_USER_ROLE } from '../actions/index';

const INITIAL_STATE = { value: 'two', label: 'Two' };

export default function(state = INITIAL_STATE, action) {
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