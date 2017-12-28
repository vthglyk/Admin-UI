import { USER_LOGIN } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_LOGIN:
            console.log(action);
            return state;
            // if (action.error) {
            //     return action.payload.response.data
            // } else {
            //     return INITIAL_STATE;
            // }
        default:
            return state;
    }
}