import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions'
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
import {findAirQuality} from '../utility/calculateAirQuality';

const Plot = createPlotlyComponent(Plotly);

class CityComparisionChart extends Component {  
    
    handleBack = (e) => {
        e.stopPropagation();
        this.props.clearCurrentCity();
    }

    componentDidMount() {
        const {getAqiData} = this.props;      
        getAqiData();
    }

    mapToArray(aqiData) {
        let aqi = [];
        let city = [];
        let colour = [];
        Object.keys(aqiData).forEach((key) => {
            const value = aqiData[key];
            aqi.push(value.aqi);
            city.push(key);
            colour.push(findAirQuality(value.aqi).colour);
        });

        return {aqi, city, colour};
    }

    render() {
        const {aqiData = {}} = this.props;
        const {aqi = [], city = [], colour = []} = this.mapToArray(aqiData);
        return (
            <div className="details">
                <Link  to="/" onClick={this.handleBack} className="details__link" >
                    <span className="back_button"><img src="https://img.icons8.com/color-glass/50/000000/circled-chevron-left.png"/> </span>
                </Link>
                <div className="details__box">
                    <h1 className="details__header">Comparision Chart</h1>
                    <div className="details__plots">
                        <Plot
                            data={[
                            {
                                x: [...city],
                                y: [...aqi],
                                type: 'bar',
                                mode: 'lines',
                                line: {width: 1.5},
                                marker: {color: [...colour]},
                        
                            }
                            ]}
                            layout={{
                                width: 740, 
                                height: 420, 
                                title: 'City Aqi Comparision',
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

const mapStateToProps = ({aqiData}) => {
    return {aqiData}; 
}

export default connect(mapStateToProps, actions)(CityComparisionChart);