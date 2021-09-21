const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const httpErrorHandler = require("@middy/http-error-handler");
const createError = require("http-errors");

let count = 0;

const baseHandler = async function (event, context, cb) {
    console.log(event.body, " |||| ", count);
    count++;
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: "OKE",
        }),
    };
};

const handler = middy(baseHandler)
    .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
    .use(httpErrorHandler()); // handles common http errors and returns proper responses

module.exports = { handler };
