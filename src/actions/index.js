import axios from 'axios';
import Cookie from 'react-cookie';
import { ROOT_URL } from "../configuration/index";

export const FETCH_USER_ROLES = 'FETCH_USER_ROLES';
export const REGISTER_USER = 'REGISTER_USER';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';
export const FETCH_INFORMATION_MODELS = 'FETCH_INFORMATION_MODELS';
export const REGISTER_PLATFORM = 'REGISTER_PLATFORM';
export const DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT = 'DISMISS_PLATFORM_REGISTRATION_SUCCESS_ALERT';
export const DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT = 'DISMISS_PLATFORM_REGISTRATION_ERROR_ALERT';

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
    const data = `username=${props.username}&password=${props.password}`;
    const customHeaders = { ...headers, ['Content-Type'] : 'application/x-www-form-urlencoded; charset=UTF-8'}

    const config = {
        url: url,
        method: 'post',
        data: data,
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
        })
        .catch((res) => console.log(res));

    return {
        type: USER_LOGOUT,
        payload: request
    };
}

export function fetchInformationModels() {
    const url = `${ROOT_URL}/user/cpanel/list_all_info_models`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_INFORMATION_MODELS,
        payload: request
    };
}

export function registerPlatform(props, cb) {
    const url = `${ROOT_URL}/user/cpanel/register_platform`;

    const config = {
        url: url,
        method: 'post',
        data: props,
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