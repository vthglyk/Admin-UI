import { FETCH_INFORMATION_MODELS } from '../actions/index';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_INFORMATION_MODELS:
            if (action.error)
                return { error : `${action.payload.message}: Could not fetch the information models`};
            else {
                return  _.mapKeys(action.payload.data, "id");
            }
        default:
            return state;
    }
}