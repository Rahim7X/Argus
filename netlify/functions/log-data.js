// netlify/functions/log-data.js

const config = require("./config.js");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Log incoming request details
  const requestDetails = {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
    path: event.path,
    queryStringParameters: event.queryStringParameters,
  };
  console.log(requestDetails)
  
  // Encode authData from config.js as base64 for the Authorization header
  const encodedAuthData = Buffer.from(JSON.stringify(config.authData)).toString("base64");

  // Prepare payload to send to targetUrl
  const payload = {
    loggedData: {
      ...requestDetails,
      imageData: "", // Initialize imageData as an empty string
    },
    timestamp: new Date().toISOString(),
  };

  // Parse the event body as JSON, defaulting to an empty object on failure
  let bodyData;
  try {
    bodyData = JSON.parse(event.body);
  } catch (error) {
    bodyData = {}; // Use an empty object if parsing fails
  }

  // Get the image-data attribute value and add it to payload.loggedData.imageData
  if (bodyData['imageData']) {
    payload.loggedData.imageData = bodyData['imageData']; // Assign the string value
  }

  // First, perform a GET request to retrieve existing data
  const getResponse = await fetch(`${config.targetUrl}/.json`, {
    method: "GET",
    headers: {
      "Authorization": `bearer ${encodedAuthData}`,
      "Content-Type": "application/json",
    },
  });

  // Check if the GET request was successful
  if (!getResponse.ok) {
    throw new Error(`Failed to fetch existing data: ${getResponse.statusText}`);
  }

  const existingData = await getResponse.json(); // Parse the JSON response

  // Append the new payload to the existing data
  const updatedData = Array.isArray(existingData) ? [...existingData, payload] : [payload];

  // Perform PUT request to config.targetUrl with auth and updated data
  try {
    const response = await fetch(`${config.targetUrl}/.json`, {
      method: "PUT",
      headers: {
        "Authorization": `bearer ${encodedAuthData}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), // Send the updated data
    });

    // Return status based on the response from targetUrl
    return {
      statusCode: response.status,
      body: JSON.stringify({ message: "Request logged successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
