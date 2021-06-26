import ActionTypes from './ActionTypes';

export const setAqiData = (data) => (dispatch) => {
    dispatch({type: ActionTypes.GET_AQI_DATA, payload: data});
};

export const clearAqiData = () => (dispatch) => {
    dispatch({type: ActionTypes.CLEAR_AQI_DATA});
};