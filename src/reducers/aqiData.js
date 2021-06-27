import ActionTypes from '../actions/ActionTypes';

export default function aqiData(state = {}, action) {
    const payload = action.payload;
    let newState = {};
    switch (action.type) {
        case ActionTypes.SET_AQI_DATA:
            newState =  {...state, ...payload};
            break;
        case ActionTypes.CLEAR_AQI_DATA:
            newState = {};
            break;
        default:
            newState = state;
    }
    return newState;
}