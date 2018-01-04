import _ from 'lodash';
import { REGISTER_PLATFORM,
    DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT,
    DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT } from '../actions/index';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case REGISTER_PLATFORM:
            if (action.error) {
                let newState = {};

                if (action.payload.response) {
                    const message = action.payload.response.data;

                    if (message.pl_reg_error_id)
                        newState.id_error = message.pl_reg_error_id;

                    if (message.pl_reg_error_name)
                        newState.name_error = message.pl_reg_error_name;

                    // Todo: Add support for more than 1 descriptions
                    if (message.pl_reg_error_description_description)
                        newState.description_error = message.pl_reg_error_description_description[0];

                    if (message.pl_reg_error_interworkingServices_url) {
                        for(let i = 0; i < message.pl_reg_error_interworkingServices_url.length; i++)
                            if(message.pl_reg_error_interworkingServices_url[i])
                                newState.interworkingServiceUrl_error = message.pl_reg_error_interworkingServices_url[i];
                    }

                    if (message.pl_reg_error_interworkingServices_informationModelId) {
                        for(let i = 0; i < message.pl_reg_error_interworkingServices_url.length; i++)
                            if(message.pl_reg_error_interworkingServices_informationModelId[i] != null)
                                newState.informationModel_error = message.pl_reg_error_interworkingServices_informationModelId[i];
                    }

                    if (message.pl_reg_error_isEnabler)
                        newState.type_error = message.pl_reg_error_isEnabler;

                    newState.error = message.platformRegistrationError;
                    return newState;
                } else
                    return { error : "Network Error: Could not contact server" };
            }
            else {
                const success = `Registration of platform "${JSON.parse(action.payload.config.data).name}" was successful!`;
                return { success };
            }
        case DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "success");
        case DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "error");
        default:
            return state;
    }
}