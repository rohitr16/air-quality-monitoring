import { w3cwebsocket as W3CWebSocket } from "websocket";
import ActionTypes from './ActionTypes';
import {Resource} from '../constants/Url'

export const getAqiData = (history) => (dispatch) => {
        const client = new W3CWebSocket(Resource.URI)
        client.onerror = (error) => {
            history.push('/error');
        };
        client.onopen = () => {
            console.log("Client connected");
        };
        client.onmessage = (message) => {
            const{data} = message;
            const dataFormatted = JSON.parse(data);
            const aqiData = {};
            dataFormatted.forEach((item) => {
                aqiData[item.city] = {...item, lastUpdated: new Date(Date.now())};
            });
            dispatch({type: ActionTypes.SET_AQI_DATA, payload: aqiData});
        }
    
};

export const clearAqiData = () => (dispatch) => {
    dispatch({type: ActionTypes.CLEAR_AQI_DATA});
};

export const setCityDetails = (data) => (dispatch) => {
    dispatch({type: ActionTypes.SET_CITY_DETAILS, payload: data});;
};

export const setCurrentCity = (city) => (dispatch) => {
    dispatch({type: ActionTypes.SET_CURRENT_CITY, payload: city});
};

export const clearCurrentCity = () => (dispatch) => {
    dispatch({type: ActionTypes.CLEAR_CURR_CITY});
};



