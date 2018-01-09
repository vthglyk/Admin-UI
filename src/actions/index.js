import axios from 'axios';
import Cookie from 'react-cookie';
import { ROOT_URL } from "../configuration/index";

export const FETCH_USER_ROLES = 'FETCH_USER_ROLES';
export const REGISTER_USER = 'REGISTER_USER';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';
export const FETCH_ALL_INFORMATION_MODELS = 'FETCH_ALL_INFORMATION_MODELS';
export const FETCH_USER_PLATFORMS = 'FETCH_USER_PLATFORMS';
export const FETCH_USER_INFORMATION_MODELS = 'FETCH_USER_INFORMATION_MODELS';
export const REGISTER_PLATFORM = 'REGISTER_PLATFORM';
export const REGISTER_INFO_MODEL = 'REGISTER_INFO_MODEL';
export const UPLOADING_INFO_MODEL_PROGRESS = 'UPLOADING_INFO_MODEL_PROGRESS';
export const DELETE_PLATFORM = 'DELETE_PLATFORM';
export const DELETE_INFO_MODEL = 'DELETE_INFO_MODEL';
export const DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT = 'DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT';
export const DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT = 'DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT';
export const DISMISS_PLATFORM_DELETION_SUCCESS_ALERT = 'DISMISS_PLATFORM_DELETION_SUCCESS_ALERT';
export const DISMISS_PLATFORM_DELETION_ERROR_ALERT = 'DISMISS_SUCCESS_REGISTRATION_ERROR_ALERT';
export const DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT = 'DISMISS_INFO_MODEL_REGISTRATION_SUCCESS_ALERT';
export const DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT = 'DISMISS_INFO_MODEL_REGISTRATION_ERROR_ALERT';
export const DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT = 'DISMISS_INFO_MODEL_DELETION_SUCCESS_ALERT';
export const DISMISS_INFO_MODEL_DELETION_ERROR_ALERT = 'DISMISS_INFO_MODEL_DELETION_ERROR_ALERT';

axios.defaults.withCredentials = true;

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-TOKEN': Cookie.load('XSRF-TOKEN')
};

export function changeModalState(modal, state) {
    return {
        type: CHANGE_MODAL_STATE,
        payload: {
            modal: modal,
            state: state
        }
    };
}

export function fetchUserRoles() {
    const request = axios.get(`${ROOT_URL}/register/roles`);

    return {
        type: FETCH_USER_ROLES,
        payload: request
    };
}

export function registerUser(props, cb) {
    const request = axios.post(`${ROOT_URL}/register`, props)
        .then(res => {
            cb();
            return res;
        });

    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function userLogin(props, cb) {
    const url = `${ROOT_URL}/user/login`;
    const customHeaders = { ...headers, ['Content-Type'] : 'application/x-www-form-urlencoded; charset=UTF-8' };
    let formData = new FormData();
    formData.append("username", props.username);
    formData.append("password", props.password);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: USER_LOGIN,
        payload: request
    };
}

export function userLogout(cb) {
    const url = `${ROOT_URL}/user/logout`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: USER_LOGOUT,
        payload: request
    };
}

export function fetchAllInformationModels() {
    const url = `${ROOT_URL}/user/cpanel/list_all_info_models`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_ALL_INFORMATION_MODELS,
        payload: request
    };
}

export function fetchUserPlatforms() {
    const url = `${ROOT_URL}/user/cpanel/list_user_platforms`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_USER_PLATFORMS,
        payload: request
    };
}

export function fetchUserInformationModels() {
    const url = `${ROOT_URL}/user/cpanel/list_user_info_models`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_USER_INFORMATION_MODELS,
        payload: request
    };
}

export function registerPlatform(platform, cb) {
    const url = `${ROOT_URL}/user/cpanel/register_platform`;

    const config = {
        url: url,
        method: 'post',
        data: platform,
        headers: headers
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: REGISTER_PLATFORM,
        payload: request
    };
}

export function deletePlatform(platformId) {
    const url = `${ROOT_URL}/user/cpanel/delete_platform`;
    const customHeaders = { ...headers, ['Content-Type'] : 'application/x-www-form-urlencoded; charset=UTF-8' };
    let formData = new FormData();
    formData.append('platformIdToDelete', platformId);


    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config);

    return {
        type: DELETE_PLATFORM,
        payload: request
    };
}

export function registerInfoModel(props, cb, uploadingInfoModelProgress) {
    const url = `${ROOT_URL}/user/cpanel/register_information_model`;
    const customHeaders = { ...headers, ['Content-Type'] : 'multipart/form-data' };
    let formData = new FormData();
    formData.append('info-model-name', props.name);
    formData.append('info-model-uri', props.uri);
    formData.append('info-model-rdf', props.rdf[0]);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders,
        onUploadProgress: function (progressEvent) {
            if (progressEvent.lengthComputable) {
                uploadingInfoModelProgress(progressEvent.loaded / progressEvent.total * 100)
            }
        }
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: REGISTER_INFO_MODEL,
        payload: request
    };
}

export function uploadingInfoModelProgress(loadedPerCent) {
    return {
        type: UPLOADING_INFO_MODEL_PROGRESS,
        payload: Math.round(loadedPerCent)
    };
}

export function deleteInfoModel(infoModelId) {
    const url = `${ROOT_URL}/user/cpanel/delete_information_model`;
    const customHeaders = { ...headers, ['Content-Type'] : 'application/x-www-form-urlencoded; charset=UTF-8' };
    let formData = new FormData();
    formData.append('infoModelIdToDelete', infoModelId);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config);

    return {
        type: DELETE_INFO_MODEL,
        payload: request
    };
}

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