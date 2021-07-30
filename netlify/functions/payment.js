const middy = require("@middy/core");
const midtransClient = require("midtrans-client");
const jsonBodyParser = require("@middy/http-json-body-parser");
const httpErrorHandler = require("@middy/http-error-handler");
const createError = require("http-errors");

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MT_SERVER_KEY,
});

const baseHandler = async function (event, context, cb) {
  const { amount, type } = event.body;

  let parameter = {
    transaction_details: {
      order_id: type + Math.random() * 10,
      gross_amount: amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "Bagus",
      last_name: "Rizki",
      email: "r@mail.com",
      phone: "08111222333",
    },
  };

  return snap
    .createTransaction(parameter)
    .then((transaction) => {
      // transaction token for client
      let transactionToken = transaction.token;
      return {
        statusCode: 200,
        body: JSON.stringify({
          token: transactionToken,
        }),
      };
    })
    .catch((err) => {
      throw new createError.InternalServerError(err.message);
    });
};

const handler = middy(baseHandler)
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(httpErrorHandler()); // handles common http errors and returns proper responses

module.exports = { handler };
