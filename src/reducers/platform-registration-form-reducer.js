import _ from 'lodash';
import { REGISTER_PLATFORM,
    DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT,
    DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT } from '../actions/index';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {

        default:
            return state;
    }
}