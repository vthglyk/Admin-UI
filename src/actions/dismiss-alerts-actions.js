export const DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT = "DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT";
export const DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT = "DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT";
export const DISMISS_PLATFORM_DELETION_SUCCESS_ALERT = "DISMISS_PLATFORM_DELETION_SUCCESS_ALERT";
export const DISMISS_PLATFORM_DELETION_ERROR_ALERT = "DISMISS_SUCCESS_REGISTRATION_ERROR_ALERT";
export const DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT = "DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT";
export const DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT = "DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT";
export const DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT = "DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT";
export const DISMISS_INFO_MODEL_DELETION_ERROR_ALERT = "DISMISS_INFO_MODEL_DELETION_ERROR_ALERT";

export function dismissPlatformRegistrationSuccessAlert() {
    return {
        type: DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT
    };
}

export function dismissPlatformRegistrationErrorAlert() {
    return {
        type: DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT
    };
}

export function dismissPlatformDeletionSuccessAlert() {
    return {
        type: DISMISS_PLATFORM_DELETION_SUCCESS_ALERT
    };
}

export function dismissPlatformDeletionErrorAlert() {
    return {
        type: DISMISS_PLATFORM_DELETION_ERROR_ALERT
    };
}

export function dismissInfoModelRegistrationSuccessAlert() {
    return {
        type: DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT
    };
}

export function dismissInfoModelRegistrationErrorAlert() {
    return {
        type: DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT
    };
}

export function dismissInfoModelDeletionSuccessAlert() {
    return {
        type: DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT
    };
}

export function dismissInfoModelDeletionErrorAlert() {
    return {
        type: DISMISS_INFO_MODEL_DELETION_ERROR_ALERT
    };
}