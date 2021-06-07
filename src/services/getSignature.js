const crypto = require("crypto");
const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;


function isObject(data) {
  return data === Object(data)
}

function sortKeys(data) {
  const keys = Object.keys(data).sort();
  sortedData = {};
  for (const key of keys) {
    if (isObject(data[key])) {
      sortedData[key] = sortKeys(data[key]);
    } else {
      sortedData[key] = data[key];
    }
  }
  return sortedData;
}

function base64URLEncode(data) {
  const json = JSON.stringify(data);
  const base64 = Buffer.from(json, "utf8").toString("base64");
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function preparePayload(data) {
  const sortedData = sortKeys(data);
  return base64URLEncode(sortedData);
}

function sign(secret, payload, authCode) {
  const signature = crypto
    .createHmac("sha256", client_secret)
    .update(payload)
    .digest("hex");
  return signature;
}

const signature = (authCode, timestamp) => {
  const payload = preparePayload({
    code: authCode,
    client_id: client_id,
    timestamp: timestamp,
  });
  return sign(client_secret, payload);
}

module.exports = signature;
