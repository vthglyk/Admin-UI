import { REGISTER_USER } from '../actions/index';

const INITIAL_STATE = { validationErrors: {},  errorMessage: ""};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case REGISTER_USER:
            console.log(action);
            if (action.error) {
                return action.payload.response.data
            } else {
                return INITIAL_STATE;
            }
        default:
            return state;
    }
}