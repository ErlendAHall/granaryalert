import { getPossibleLowClouds } from "./modules/weather.js";
import { optionsIsWellFormed } from "./modules/options.js";
import { SMS } from "./modules/alert/sms.js";

async function handleDailyReport() {
  let possibleLowClouds = await getPossibleLowClouds();

  if (possibleLowClouds.length > 0) {
    SMS.send(createMessage(possibleLowClouds));
  }
  return possibleLowClouds;
}

/**
 * @param {LowCloudsReport[]} rep
 */
function createMessage(reports) {

  // Find the earliest (starting from 18:00) report.
  let reportTimes = reports.map((r) => r.time.getTime());
  let earliest = reportTimes.reduce((accu, current) => {
    return Math.min(accu, current);
  });
  let reportToBeReported = reports.find((r) => r.time.getTime() === earliest);

  let day = reportToBeReported.time.getDate();
  let hour = reportToBeReported.time.getHours();

  return `Det blir klarvær (${Math.floor(reportToBeReported.cloudAreaFraction)
    }%) den ${day}. fra klokken ${hour}. Lufttemperatur ${Math.floor(reportToBeReported.airTemperature)
    }grader. Vindhastighet ${Math.floor(reportToBeReported.windSpeed)}m/s`;
}

// PROGRAM START
// TODO: Check if options is well-formed before starting program.
if (optionsIsWellFormed()) {
  let everyDayInterval = 86400000; //1 day in milliseconds.
  setInterval(handleDailyReport, everyDayInterval);
} else console.log("Options is not well formed");

