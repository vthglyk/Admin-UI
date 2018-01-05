import { FETCH_USER_PLATFORMS } from '../actions/index';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_USER_PLATFORMS:
            console.log(action);
            if (action.error)
                return { error : `${action.payload.message}: Could not fetch the user platforms`};
            else {
                const data = action.payload.data;
                return {...data, ["availablePlatforms"] :  _.mapKeys(data.availablePlatforms, "id")};
            }
        default:
            return state;
    }
}