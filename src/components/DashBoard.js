import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TableHeaders} from '../constants/Labels'
import * as actions from '../actions';
import {findAirQuality} from '../utility/calculateAirQuality';
import { Link } from 'react-router-dom';

class DashBoard extends Component {

    componentDidMount() {
        const {getAqiData} = this.props;
        getAqiData();
    }

    roundToTwo(number) {
        return +(Math.round(number + "e+2") + "e-2");
    }

    onClickRow = (city) => {
        const{history, setCurrentCity} = this.props;
        setCurrentCity(city);
        history.push(`/cityDetails/${city}`);
    }

    renderTableRows(aqiData) {
        return (
            <tbody>
                {Object.keys(aqiData).map((item) => {
                    const value = aqiData[item];
                    const airQualityMap = findAirQuality(value.aqi);
                    return (
                        <tr 
                            key={value.city} 
                            className={airQualityMap.colour} 
                            onClick={() => this.onClickRow(value.city)}
                        >
                            <td>{value.city}</td>
                            <td>{this.roundToTwo(value.aqi)}</td>
                            <td>{airQualityMap.airQuality}</td>
                            <td>{value.lastUpdated.toLocaleTimeString()}</td>
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
                <Link  to="/cityCompChart" className="container__link" >
                    <span className="container__button">Show Chart</span>
                </Link>
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