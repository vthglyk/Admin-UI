import { CHANGE_MODAL_STATE } from '../actions/index';

export const USER_REGISTRATION_MODAL = "USER_REGISTRATION_MODAL";
export const LOGIN_MODAL = "LOGIN_MODAL";

let INITIAL_STATE = {};
INITIAL_STATE[USER_REGISTRATION_MODAL] = false;
INITIAL_STATE[LOGIN_MODAL] = false;

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case CHANGE_MODAL_STATE:
            const { payload } = action;
            return { ...state, [payload.modal]: payload.state };
        default:
            return state;
    }
}