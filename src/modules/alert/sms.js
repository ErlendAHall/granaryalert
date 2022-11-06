import { getOptions } from "../options/options.js";

const SMS = Object.create({});
let options = getOptions();

/**
 * Constructs a SMS-send request to Twilio.
 * @param {string} message
 * @returns A closured fetch call.
 */
SMS.createRequest = function createHTTPRequest(message) {
  let url =
    "https://api.twilio.com/2010-04-01/Accounts/AC804ae0af14474cc8072f1fed0169e153/Messages.json";

  let body = new URLSearchParams();
  body.append("MessagingServiceSid", options.sms.twilioMessagingServiceSid);
  body.append("To", options.sms.recipient); // TODO: Validate numbers

  // TODO: Validate message before sending. Should not be empty, typeof string and not too long.
  body.append("Body", message);

  let headers = new Headers();
  let twilioSID = options.sms.twilioAccountSID;
  let twilioAuthToken = options.sms.twilioAuthToken;
  headers.append(
    "Authorization",
    "Basic " + btoa(twilioSID + ":" + twilioAuthToken),
  );
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  let init = {
    method: "POST",
    headers: headers,
    body: body,
  };

  // Return a closure to perform the POST request.
  return async function send() {
    return await fetch(url, init);
  };
};

/**
 * Performs the relay of a SMS text message via Twilio.
 * @param {string} message The bodytext of the SMS message.
 */
SMS.send = async function relaySMSToTwilio(message) {
  // TODO: Validate message
  let sendRequest = this.createRequest(message);
  console.info(options);
  console.info(sendRequest);
  // TODO: Handle failed sends.
  await sendRequest();
};

export { SMS };
