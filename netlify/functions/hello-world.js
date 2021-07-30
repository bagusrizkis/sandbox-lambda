const middy = require("@middy/core");

const jsonBodyParser = require("@middy/http-json-body-parser");
const httpErrorHandler = require("@middy/http-error-handler");
const customMid = require("../mid/customMid");

const baseHandler = async function (event, context, cb) {
  // Handle the request and return a promise
  console.log("Received body: ", event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!",
    }),
  };
};

const handler = middy(baseHandler)
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(customMid()) // handles common http errors and returns proper responses
  .use(httpErrorHandler()); // handles common http errors and returns proper responses

module.exports = { handler };
