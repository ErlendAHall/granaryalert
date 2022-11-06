/**
 * @typedef LowCloudsReport
 * @type {object}
 * @param {Date} time
 * @param {number} cloudAreaFraction
 * @param {number} airTemperature
 * @param {number} windSpeed
 */

/**
 * @typedef DailyForecast
 * @type {object}
 * @param {Date} time
 * @param {number} airPressureAtSeaLevel
 * @param {number} airTemperature
 * @param {number} cloudAreaFraction
 * @param {number} windFromDirection
 * @param {number} windSpeed
 */

/**
 * @typedef Timeseries
 * @type {object}
 * @param {Date} time,
 * @param {YRGenericData} data
 */

/**
 * @typedef YRGenericData 
 * @type {object}
 * @param {YrInstant}
*/


/**
 * @typedef YrInstant
 * @type {object}
 * @param {TimeseriesDetails}
 */

/**
 * @typedef TimeseriesDetails
 * @type {object}
 * @param {number} air_pressure_at_sea_level
 * @param {number} air_temperature
 * @param {number} air_temperature_percentile_10
 * @param {number} air_temperature_percentile_90
 * @param {number} cloud_area_fraction
 * @param {number} cloud_area_fraction_low
 * @param {number} cloud_area_fraction_medium
 * @param {number} cloud_area_fraction_high
 * @param {number} dew_point_temperature
 * @param {number} fog_area_fraction
 * @param {number} relative_humidity
 * @param {number} ultraviolet_index_clear_sky
 * @param {number} wind_from_direction
 * @param {number} wind_speed
 * @param {number} wind_speed_of_gust
 * @param {number} wind_speed_percentile_10
 * @param {number} wind_speed_percentile_90
 */