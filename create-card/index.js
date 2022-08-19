const DYNAMODB = require("aws-sdk/clients/dynamodb");
const {
  validationDni,
  getParams,
  getAge,
  getFormatData,
  generateCode,
  getExpiration,
} = require("./utils");

const dynamodb = new DYNAMODB({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const dni = validationDni(event);

    const params = getParams(dni);
    const client = await dynamodb.getItem(params).promise();

    if (!client.Item) {
      throw new Error("Client not found!");
    }

    const age = getAge(client.Item.birthday.S);
    let cardType = "Classic";

    if (age > 45) {
      cardType = "Gold";
    }

    const data = {
      ...client.Item,
      cardType: { S: cardType },
      expiration: { S: getExpiration() },
      code: { N: `${generateCode()}` },
    };

    const formatData = getFormatData(data);

    await dynamodb.updateItem(formatData).promise();

    const response = {
      statusCode: 200,
      body: "Updated!",
    };
    return response;
  } catch (e) {
    return {
      statusCode: 400,
      message: `${e}`,
    };
  }
};
