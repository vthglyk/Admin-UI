import Cookie from "react-cookie";


export const CHANGE_MODAL_STATE = "CHANGE_MODAL_STATE";

export const headers = {
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

