import {
    DEACTIVATE_PLATFORM_CONFIG_MODAL
} from "../actions/index";
import { DISMISS_PLATFORM_CONFIG_ERROR_ALERT } from "../actions/index";
import {ACTIVATE_PLATFORM_CONFIG_MODAL, GET_PLATFORM_CONFIGURATION} from "../actions";

const INITIAL_STATE = { platformId : "" };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ACTIVATE_PLATFORM_CONFIG_MODAL:
            return { platformId : action.payload };
        case DEACTIVATE_PLATFORM_CONFIG_MODAL:
            return INITIAL_STATE;
        case GET_PLATFORM_CONFIGURATION:
            if (action.payload.error) {
                if (action.payload.response) {
                    const dec = new TextDecoder();
                    const message = dec.decode(action.payload.response.data);
                    return {...state, platformConfigError: message};
                } else {
                    return {...state, platformConfigError: "Network Error: Could not contact server"};
                }
            }
            else {
                return _.omit(state, "platformConfigError");
            }
        case DISMISS_PLATFORM_CONFIG_ERROR_ALERT:
            return _.omit(state, "platformConfigError");
        default:
            return state;
    }
}