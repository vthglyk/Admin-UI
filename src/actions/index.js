export const SELECT_USER_ROLE = 'SELECT_USER_ROLE';

export function selectUserRole(userRole) {
    return {
        type: SELECT_USER_ROLE,
        payload: userRole
    };
}



