/** @type {KlarVærOptions} */
import options from "../../options.json" assert { type: "json" };

function optionsIsWellFormed() {
  let { location, noticeInHours, sms } = options;

  if (!location) return false;
  if (typeof location.altitude !== "number" || location.altitude <= 0) {
    return false;
  }
  if (typeof location.latitude !== "number" || location.latitude <= 0) {
    return false;
  }
  if (typeof location.longitude !== "number" || location.longitude <= 0) {
    return false;
  }
  if (typeof noticeInHours !== "number" || noticeInHours <= 1) return false;
  if (typeof sms.recipient !== "string" || sms.recipient.length <= 0) {
    return false;
  }
  if (typeof sms.originator !== "string" || sms.originator.length <= 0) {
    return false;
  }

  return true;
}

/** Returns the user options.
 * @returns {KlarVærOptions}
 */
function getOptions() {
  return options;
}

export { options, optionsIsWellFormed };
