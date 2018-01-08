import {
    FETCH_ALL_INFORMATION_MODELS, FETCH_USER_INFORMATION_MODELS, DELETE_INFO_MODEL,
    DISMISS_INFO_MODEL_DELETION_ERROR_ALERT, DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT,
    DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT, DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT,
} from "../actions";

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_ALL_INFORMATION_MODELS:
            if (action.error)
                return { fetching_error : `${action.payload.message}: Could not fetch the information models`};
            else {
                return {...state, availableInfoModels :  _.mapKeys(action.payload.data, "id")};
            }
        case FETCH_USER_INFORMATION_MODELS:
            if (action.error)
                return { fetching_error : `${action.payload.message}: Could not fetch user's information models`};
            else {
                return {...state, availableUserInfoModels :  _.mapKeys(action.payload.data, "id")};
            }
        case DELETE_INFO_MODEL:
            if (action.error) {
                let newState = _.omit(state, "successfulInfoModelDeletion");

                if (action.payload.response) {
                    const message = action.payload.response.data;
                    return { ...newState, infoModelDeletionError : message };
                } else {
                    return {...newState, infoModelDeletionError: "Network Error: Could not contact server"};
                }
            }
            else {
                const infoModelId = action.payload.config.data.get("infoModelIdToDelete");
                const successfulInfoModelDeletion = `Information Model "${state.availableInfoModels[infoModelId].name}" was deleted successfully!`;

                let newState = _.omit(state, "infoModelDeletionError");

                return {
                    ...newState,
                    availableInfoModels : _.omit(state.availableInfoModels, infoModelId),
                    availableUserInfoModels : _.omit(state.availableUserInfoModels, infoModelId),
                    successfulInfoModelDeletion
                };
            }
        case DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT:
            return _.omit(state, "successfulInfoModelRegistration");
        case DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT:
            return _.omit(state, "infoModelRegistrationError");
        case DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT:
            return _.omit(state, "successfulInfoModelDeletion");
        case DISMISS_INFO_MODEL_DELETION_ERROR_ALERT:
            return _.omit(state, "infoModelDeletionError");
        default:
            return state;
    }
}