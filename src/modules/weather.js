import "../../docs/index.js";

/** @type {KlarVærOptions} */
import { getOptions } from "./options/options.js";
let options = getOptions();

/** Returns the datetime certain days in the future.
 * The number of days is user defined in the options file.
 */
function getNoticePeriodFromNow() {
  let fromNow = new Date();
  fromNow.setHours(options.noticeInHours);
  return fromNow;
}

/**
 * Fetches the latest forecast from YR.
 * https://api.met.no/weatherapi/locationforecast/2.0#!/data/get_complete
 */
async function getYrForecast() {
  // TODO: Log fetch failures.
  let url =
    `https://api.met.no/weatherapi/locationforecast/2.0/complete?altitude=${
      String(options.location.altitude)
    }&lat=${String(options.location.latitude)}&lon=${
      String(options.location.longitude)
    }`;
  let yrResponse = await fetch(url);
  return yrResponse.json();
}

/**
 * Fetches the latest forecast and maps the fifth forecast day into a {DailyForecast}.
 * @returns {Promise<LowCloudsReport[]>}
 */
async function getLowCloudsReport() {
  let yrResponse = await getYrForecast();

  let noticePeriodFromNow = getNoticePeriodFromNow().getDay();
  return yrResponse.properties.timeseries
    .filter(dateMatchesNoticePeriod)
    .filter(isEvening)
    .map(createLowCloudsReport);

  /**
   * Returns true if the specifiec timeseries occurs two days from now.
   * @param {Timeseries} timeseries
   * @returns {boolean}
   */
  function dateMatchesNoticePeriod(timeseries) {
    let date = new Date(timeseries.time);
    return date.getDay() === noticePeriodFromNow;
  }

  /**
   * Returns true if the specified timeseries occurs during evening hours.
   * @param {Timeseries} timeseries
   * @returns {boolean}
   */
  function isEvening(timeseries) {
    let date = new Date(timeseries.time);
    let theHour = date.getHours();
    return theHour >= 18 && theHour <= 24;
  }

  /** Maps the raw Yr response into a more friendly format
   * @param {Timeseries} timeseries
   * @returns {LowCloudsReport}
   */
  function createLowCloudsReport(timeseries) {
    return {
      time: new Date(timeseries.time),
      cloudAreaFraction: timeseries.data.instant.details.cloud_area_fraction,
      airTemperature: timeseries.data.instant.details.air_temperature,
      airPressureAtSeaLevel:
        timeseries.data.instant.details.air_pressure_at_sea_level,
      windFromDirection: timeseries.data.instant.details.wind_from_direction,
      windSpeed: timeseries.data.instant.details.wind_speed,
    };
  }
}

/**
 * Analyzes a second-day forecast and returns a list of low cloud reports.
 * @returns {Promise<LowCloudsReport[]>} Zero or more low cloud reports.
 */
async function getPossibleLowClouds() {
  /** @type {LowCloudsReport[]} */
  let lowCloudsReports = await getLowCloudsReport();

  return lowCloudsReports.filter((report) => report.cloudAreaFraction <= 30);
}

export { getPossibleLowClouds };
