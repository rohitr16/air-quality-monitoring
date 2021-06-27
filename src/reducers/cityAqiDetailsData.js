import ActionTypes from '../actions/ActionTypes';

export default function cityAqiDetailsData(state = {}, action) {
    const payload = action.payload;
    let newState = {};
    switch (action.type) {
        case ActionTypes.SET_CITY_DETAILS:
            newState =  {...state, ...payload};
            break;
        case ActionTypes.SET_CURRENT_CITY:
            newState = {...state, currentCity: payload}
            break;
        case ActionTypes.CLEAR_CURR_CITY:
            newState = {...state, currentCity: undefined};
            break;
        default:
            newState = state;
    }
    return newState;
}