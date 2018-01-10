import axios from "axios";
import { ROOT_URL } from "../configuration";
import { headers } from "./index";


axios.defaults.withCredentials = true;

export const FETCH_USER_PLATFORMS = "FETCH_USER_PLATFORMS";
export const REGISTER_PLATFORM = "REGISTER_PLATFORM";
export const DELETE_PLATFORM = "DELETE_PLATFORM";
export const ACTIVATE_PLATFORM_DELETE_MODAL = "ACTIVATE_PLATFORM_DELETE_MODAL";
export const DEACTIVATE_PLATFORM_DELETE_MODAL = "DEACTIVATE_PLATFORM_DELETE_MODAL";
export const ACTIVATE_PLATFORM_CONFIG_MODAL = "ACTIVATE_PLATFORM_CONFIG_MODAL";
export const DEACTIVATE_PLATFORM_CONFIG_MODAL = "DEACTIVATE_PLATFORM_CONFIG_MODAL";

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
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
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

export function activatePlatformDeleteModal(platformId) {
    return {
        type: ACTIVATE_PLATFORM_DELETE_MODAL,
        payload: platformId
    };
}

export function deactivatePlatformDeleteModal() {
    return {
        type: DEACTIVATE_PLATFORM_DELETE_MODAL,
    };
}

export function activatePlatformConfigModal(platformId) {
    return {
        type: ACTIVATE_PLATFORM_CONFIG_MODAL,
        payload: platformId
    };
}

export function deactivatePlatformConfigModal() {
    return {
        type: DEACTIVATE_PLATFORM_CONFIG_MODAL,
    };
}