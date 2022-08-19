const DYNAMODB = require("aws-sdk/clients/dynamodb");
const { validationData, getParams } = require("./utils");

const dynamodb = new DYNAMODB({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const data = validationData(event);
    const params = getParams(data);
    await dynamodb.putItem(params).promise();

    const response = {
      statusCode: 200,
      body: "Created!",
    };
    return response;
  } catch (e) {
    return {
      statusCode: 400,
      message: `${e}`,
    };
  }
};
