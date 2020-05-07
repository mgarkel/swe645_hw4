var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
  var documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const {
    zip,
    email,
    date_survey,
    state,
    city,
    dropdown,
    lastname,
    radio,
    firstname,
    streetaddress,
    checkbox,
    id,
    phone,
  } = JSON.parse(event.body);

  var params = {
    TableName: "student",
    Item: {
      zip: zip,
      email: email,
      date_survey: date_survey,
      state: state,
      city: city,
      dropdown: dropdown,
      lastname: lastname,
      radio: radio,
      firstname: firstname,
      streetaddress: streetaddress,
      checkbox: checkbox,
      id: id,
      phone: phone,
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable able to put student: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: responseBody,
  };
  return response;
};
