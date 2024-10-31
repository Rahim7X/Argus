// netlify/functions/fetch-all.js

const config = require("./config.js");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Only accept GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Check if Authorization header is provided and matches config
  const authHeader = event.headers.authorization || "";
  const expectedAuth = `Basic ${Buffer.from(`${config.username}:${config.password}`).toString("base64")}`;

  if (authHeader !== expectedAuth) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Forbidden" }),
    };
  }

  // Encode authData from config.js as base64
  const encodedAuthData = Buffer.from(JSON.stringify(config.authData)).toString("base64");

  // Perform GET request to the target URL with X-AUTH-DATA header
  try {
    const response = await fetch(`${config.targetUrl}/.json`, {
      method: "DELETE",
      headers: {
        "Authorization": `bearer ${encodedAuthData}`,
      },
    });

    // Check if the response is null or if no data was returned
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify(null),
      };
    }

    const data = await response.json();

    // If data is null, respond with null
    if (data === null) {
      return {
        statusCode: 200,
        body: JSON.stringify(JSON.stringify({ status: "sucess" })),
      };
    }

    // Forward the response from the target URL
    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
