import {AirQuality, ColourMappings} from '../constants/Labels';

export const findAirQuality = (value) => {
    
    if (value >= 0 && value <= 50) {
        return {airQuality: AirQuality.GOOD, colour: ColourMappings.GOOD};
    } else if (value > 50 && value <= 100) {
        return {airQuality: AirQuality.SATISFACTORY, colour: ColourMappings.SATISFACTORY};
    } else if (value > 100 && value <= 200) {
        return {airQuality: AirQuality.MODERATE, colour: ColourMappings.MODERATE};
    } else if (value > 200 && value <= 300) {
        return {airQuality: AirQuality.POOR, colour: ColourMappings.POOR};
    } else if (value > 300 && value <= 400) {
        return {airQuality: AirQuality.VERY_POOR, colour: ColourMappings.VERY_POOR};
    }

    return {airQuality: AirQuality.SEVERE, colour: ColourMappings.SEVERE};
}