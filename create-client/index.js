const DYNAMODB = require("aws-sdk/clients/dynamodb");
const SNS = require("aws-sdk/clients/sns");
const { validationData, getParams } = require("./utils");

const dynamodb = new DYNAMODB({ region: "us-east-1" });
const sns = new SNS({ region: "us-east-1" });

const SNS_ARN = "arn:aws:sns:us-east-1:450865910417:diegoTolaba-clientCreated";

exports.handler = async (event) => {
  try {
    const data = validationData(event);
    const params = getParams(data);
    await dynamodb.putItem(params).promise();
    await sns
      .publish({
        Message: JSON.stringify(event),
        TopicArn: SNS_ARN,
      })
      .promise();

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
