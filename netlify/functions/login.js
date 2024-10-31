// netlify/functions/login.js

const config = require("./config.js");

exports.handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Parse the request body
  const { username, password } = JSON.parse(event.body || "{}");

  // Check if the username and password match those in config
  if (username === config.username && password === config.password) {
    // Base64 encode the username and password
    const credentials = Buffer.from(`${username}:${password}`).toString("base64");

    return {
      statusCode: 200,
      body: JSON.stringify({ encodedCredentials: credentials }),
    };
  }

  // If password is incorrect
  return {
    statusCode: 403,
    body: JSON.stringify({ error: "Forbidden" }),
  };
};
