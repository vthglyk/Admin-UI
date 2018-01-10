import { ACTIVATE_PLATFORM_CONFIG_MODAL, DEACTIVATE_PLATFORM_CONFIG_MODAL } from "../actions/platform-actions";

const INITIAL_STATE = { platformId : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_PLATFORM_CONFIG_MODAL:
            return { platformId : action.payload };
        case DEACTIVATE_PLATFORM_CONFIG_MODAL:
            return INITIAL_STATE;
        default:
            return state;
    }
}