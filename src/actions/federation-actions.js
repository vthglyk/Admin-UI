import axios from "axios";
import {ROOT_URL} from "../configuration";
import {
    headers, FETCH_FEDERATIONS, REGISTER_FEDERATION, DELETE_FEDERATION,
    ACTIVATE_FEDERATION_DELETE_MODAL, DEACTIVATE_FEDERATION_DELETE_MODAL
} from "./index";

axios.defaults.withCredentials = true;

export function fetchFederations() {
    const url = `${ROOT_URL}/admin/cpanel/list_federations`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_FEDERATIONS,
        payload: request
    };
}

export function registerFederation(props, cb) {
    const url = `${ROOT_URL}/admin/cpanel/create_federation`;

    const config = {
        url: url,
        method: 'post',
        data: props,
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: REGISTER_FEDERATION,
        payload: request
    };
}

export function deleteFederation(federationIdToDelete) {
    const url = `${ROOT_URL}/admin/cpanel/delete_federation`;
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('federationIdToDelete', federationIdToDelete);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config);

    return {
        type: DELETE_FEDERATION,
        payload: request
    };
}

export function activateFederationDeleteModal(federationId) {
    return {
        type: ACTIVATE_FEDERATION_DELETE_MODAL,
        payload: federationId
    };
}

export function deactivateFederationDeleteModal() {
    return {
        type: DEACTIVATE_FEDERATION_DELETE_MODAL,
    };
}