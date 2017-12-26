import axios from 'axios';

export const SELECT_USER_ROLE = 'SELECT_USER_ROLE';
export const FETCH_USER_ROLES = 'FETCH_USER_ROLES';

const ROOT_URL = 'http://localhost:8090/administration';

export function selectUserRole(userRole) {
    return {
        type: SELECT_USER_ROLE,
        payload: userRole
    };
}

export function fetchUserRoles() {
    const request = axios.get(`${ROOT_URL}/register/roles`);

    return {
        type: FETCH_USER_ROLES,
        payload: request
    };
}



