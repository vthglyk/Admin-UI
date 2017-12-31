import axios from 'axios';
import Cookie from 'react-cookie';
import { ROOT_URL } from "../configuration/index";

export const FETCH_USER_ROLES = 'FETCH_USER_ROLES';
export const REGISTER_USER = 'REGISTER_USER';
export const USER_LOGIN = 'USER_LOGIN';
export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';

axios.defaults.withCredentials = true;

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
    const config = {
        url: url,
        method: 'post',
        data: data,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-XSRF-TOKEN': Cookie.load('XSRF-TOKEN')
        }
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    // Same functionality with fetch

    // const config = {
    //     method: 'post',
    //     body: data,
    //     credentials: 'include',
    //     // mode: 'cors',
    //     headers: {
    //         'X-Requested-With': 'XMLHttpRequest',
    //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         'X-XSRF-TOKEN': Cookie.load('XSRF-TOKEN')
    //     }
    // };

    // const request = fetch(url, config)
    //     .then(res => {
    //         cb(res);
    //         return res;
    //     });

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
