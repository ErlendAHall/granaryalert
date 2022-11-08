import { debugOptions } from "./debugOptions.js";
import { resolve } from "../../deps.js";
import { env } from "../env/env.js";


function optionsIsWellFormed(options) {
  let { location, noticeInHours, sms } = options;

  if (!location) {
    return false;
  }
  if (typeof location.altitude !== "number" || location.altitude <= 0) {
    console.error("");
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
/**
 * Returns a pre-parsed options file for debug purposes
 */
function getDebugOptions() {
  if (!env.debug) {
    console.error(
      "A pre-parsed options is being used, but the program is not in debug mode.",
    );
    throw new Error(
      "A pre-parsed options is being used, but the program is not in debug mode.",
    );
  }
  return debugOptions;
}
/** Returns the user options.
 * @returns {Promise<KlarVærOptions>}
 */
async function readAndParseOptions() {
  let path = resolve(Deno.execPath(), "..", "options.json");
  let decoder = new TextDecoder("utf-8");

  let textContent = await Deno.readFile(
    path,
  );
  if (!textContent) {
    handleFailedOptionsFileRead(path);
  }

  let decodedData = decoder.decode(textContent);
  
  /**@type {KlarVærOptions} */
  let parsedOptions = JSON.parse(decodedData);

  console.info("Options file was read.", parsedOptions);
  return parsedOptions;

  function handleFailedOptionsFileRead(path) {
    console.error("Failed to read the options file at ", path);
    system.exit(0);
  }

  // Dynamic imports are not yet supported in compiled executables.
  /* let options = await import(
    `${Deno.cwd()}usr/local/bin/granaryalert/options.json`,
    {
      assert: { type: "json" }
    }
  );
  return options; */
}

/**
 * Returns a parsed options object or null if the options did not pass validation.
 */
async function getOptions() {

  // For debug mode.
  if (env.debug) return getDebugOptions();

  // For production
  let options = await readAndParseOptions();
  if (optionsIsWellFormed(options)) return options;

  throw new Error("The options file was not validated.");
}

export { getOptions };
