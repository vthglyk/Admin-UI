import axios from 'axios';
import { ROOT_URL } from "../configuration/index";

export const FETCH_USER_ROLES = 'FETCH_USER_ROLES';
export const REGISTER_USER = 'REGISTER_USER';
export const USER_LOGIN = 'USER_LOGIN';
export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';

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
    const request = axios.post(`${ROOT_URL}/user/login`, props)
        .then(res => {
            cb();
            return res;
        });

    return {
        type: USER_LOGIN,
        payload: request
    };
}

export function changeModalState(modal, state) {
    return {
        type: CHANGE_MODAL_STATE,
        payload: {
            modal: modal,
            state: state
        }
    };
}
