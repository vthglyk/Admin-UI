import axios from 'axios';
import { ROOT_URL } from "../configuration/conf";

export const FETCH_USER_ROLES = 'FETCH_USER_ROLES';
export const REGISTER_USER = 'REGISTER_USER';

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


