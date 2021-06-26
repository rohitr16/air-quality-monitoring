import React, {Component} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {connect} from 'react-redux';
import {TableHeaders} from '../constants/Labels'
import * as actions from '../actions';
import {findAirQuality} from '../utility/calculateAirQuality';

const client = new W3CWebSocket('ws://city-ws.herokuapp.com/‌');
class DashBoard extends Component {

    componentDidMount() {
        const {setAqiData} = this.props;
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
            setAqiData(aqiData);
        }
    }

    roundToTwo(number) {
        return +(Math.round(number + "e+2") + "e-2");
    }

    renderTableRows(aqiData) {
        return (
            <tbody>
                {Object.keys(aqiData).map((item) => {
                    const value = aqiData[item];
                    const airQualityMap = findAirQuality(value.aqi);
                    return (
                        <tr key={value.city} className={airQualityMap.colour}>
                            <td>{value.city}</td>
                            <td>{this.roundToTwo(value.aqi)}</td>
                            <td>{airQualityMap.airQuality}</td>
                            <td>{value.lastUpdated.toDateString()+ value.lastUpdated.toLocaleTimeString()}</td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    render() {
        const {aqiData} = this.props;
        return(
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>{TableHeaders.CITY}</th>
                            <th>{TableHeaders.CURR_AQI}</th>
                            <th>{TableHeaders.STATUS}</th>
                            <th>{TableHeaders.LAST_UPDATE}</th>
                        </tr>
                    </thead>
                    {this.renderTableRows(aqiData)}
                </table>
            </div>
        )
    }
}

const mapStateToProps = ({aqiData}) => {
    return {aqiData}; 
}

export default connect(mapStateToProps, actions)(DashBoard);