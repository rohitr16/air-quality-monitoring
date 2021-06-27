import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions'
import Plotly from "plotly.js";
import createPlotlyComponent from 'react-plotly.js/factory';
import {findAirQuality} from '../utility/calculateAirQuality';
import {AirQuality, ColourMappings} from '../constants/Labels';


const Plot = createPlotlyComponent(Plotly);

class SelectedCityDetails extends Component {  
    
    handleBack = (e) => {
        e.stopPropagation();
        this.props.clearCurrentCity();
    }

    componentDidMount() {
        const {getAqiData, match, setCurrentCity, cityAqiDetailsData = {}, 
        aqiData = {}, setCityDetails, history} = this.props;      
        const {currentCity} = cityAqiDetailsData;
        if (!currentCity) {
            const {params} = match;
            setCurrentCity(params.city);
        } else {
            const cityData = aqiData[currentCity];
            let timeline = cityAqiDetailsData[currentCity] || [];
            this.popAndPush(timeline, cityData, setCityDetails);                   
        } 
        getAqiData(history);
    }

    componentDidUpdate() {
        const {cityAqiDetailsData = {}, aqiData = {}, setCityDetails} = this.props;            
        this.popAndPush(cityAqiDetailsData, setCityDetails, aqiData);                   
    }

    popAndPush(cityAqiDetailsData, setCityDetails, aqiData) {       
        const {currentCity} = cityAqiDetailsData;
        const cityData = aqiData[currentCity];
        if (!cityData) {
            return;
        }
        let timeline = cityAqiDetailsData[currentCity] || [];
        while(timeline.length >= 10) {
            timeline.splice(0,1);
        }
        if ((timeline.length ===0) ||(timeline.length > 0 && Date.now() - timeline[timeline.length -1].lastUpdated > 15000)) {
            timeline.push(cityData);
            cityAqiDetailsData[currentCity] = timeline;
            new Promise((resolve, reject) => {
                setCityDetails(cityAqiDetailsData);
                resolve();
            }); 
        }
    }

    mapTimelineToAqi (timeline = []) {
        return timeline.map((item) => {
            return item.aqi;
        });
    }

    render() {
        const {cityAqiDetailsData = {}, aqiData = {}} = this.props;
        const {currentCity} = cityAqiDetailsData;
        const currCityData = aqiData[currentCity] || {};
        const aqi = currCityData.aqi;
        const colourCity = findAirQuality(aqi);
        const timeline = this.mapTimelineToAqi(cityAqiDetailsData[currentCity]);
        return (
            <div className="details">
                <Link  to="/" onClick={this.handleBack} className="details__link" >
                    <span className="back_button"><img src="https://img.icons8.com/color-glass/50/000000/circled-chevron-left.png"/> </span>
                </Link>
                <div className="details__box">
                    <h1 className="details__header">{currentCity}</h1>
                    <div className="details__plots">
                        <Plot
                            data={[
                            {
                                x: [1, 2, 3, 4, 5, 6 , 7, 8, 9 , 10],
                                y: [...timeline],
                                type: 'scatter',
                                mode: 'lines',
                                line: {shape: 'spline'},
                                marker: {color: 'green'},
                            }
                            ]}
                            layout={{
                                width: 540, 
                                height: 320, 
                                title: 'AQI Recent Trends',
                                yaxis: {
                                    zeroline: true,
                                    showline: true,
                                    showticklabels: true
                                },
                                xaxis: {
                                    showline: true,
                                    linecolor: 'rgb(204,204,204)',
                                }
                            }}
                            config={{responsive: true}}
                        />
                        <Plot
                            data={[
                            {
                                x: [AirQuality.GOOD,currentCity, AirQuality.SEVERE],
                                y: [50,aqi,600],
                                type: 'bar',
                                mode: 'lines',
                                line: {width: 1.5},
                                marker: {color: [ColourMappings.GOOD, colourCity.colour, ColourMappings.SEVERE]},
                                width: [0.3, 0.4, 0.3],
                            }
                            ]}
                            layout={{
                                width: 540, 
                                height: 320, 
                                title: 'Live AQI',
                                font:{
                                    family: 'monospace'
                                },
                                yaxis: {
                                    zeroline: true,
                                    showline: true,
                                    showticklabels: true
                                },
                                xaxis: {
                                    showline: true,
                                    linecolor: 'rgb(204,204,204)',
                                }
                            }}
                            config={{responsive: true}}
                        />
                    </div>
                </div>

                
            </div>
        )
    }
}

const mapStateToProps = ({aqiData, cityAqiDetailsData}) => {
    return {aqiData, cityAqiDetailsData}; 
}

export default connect(mapStateToProps, actions)(SelectedCityDetails);