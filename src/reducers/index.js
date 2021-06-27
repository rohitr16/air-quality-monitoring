import { combineReducers } from 'redux';
import aqiData from './aqiData';
import cityAqiDetailsData from './cityAqiDetailsData';

export default combineReducers({
    aqiData,
    cityAqiDetailsData
});
