import { CHANGE_MODAL_STATE } from "../actions";

export const USER_REGISTRATION_MODAL = "USER_REGISTRATION_MODAL";
export const LOGIN_MODAL = "LOGIN_MODAL";
export const PLATFORM_REGISTRATION_MODAL = "PLATFORM_REGISTRATION_MODAL";
export const INFORMATION_MODEL_REGISTRATION_MODAL = "INFORMATION_MODEL_REGISTRATION_MODAL";

const INITIAL_STATE = {
    [USER_REGISTRATION_MODAL] : false,
    [LOGIN_MODAL] : false,
    [PLATFORM_REGISTRATION_MODAL] : false,
    [INFORMATION_MODEL_REGISTRATION_MODAL] : false
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case CHANGE_MODAL_STATE:
            const { payload } = action;
            return { ...state, [payload.modal]: payload.state };
        default:
            return state;
    }
}