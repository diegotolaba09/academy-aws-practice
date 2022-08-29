const DYNAMODB = require("aws-sdk/clients/dynamodb");
const {
  getBirthdayGift,
  validationDni,
  getParams,
  getFormatData,
} = require("./utils");

const dynamodb = new DYNAMODB({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.Records[0].body);
    const body = JSON.parse(data.Message);
    const dni = validationDni(body);
    const params = getParams(dni);
    const client = await dynamodb.getItem(params).promise();

    if (!client.Item) {
      throw new Error("Client not found!");
    }

    const birthdayGift = getBirthdayGift(client.Item.birthday.S);
    const formatData = getFormatData(client, birthdayGift);
    await dynamodb.updateItem(formatData).promise();

    const response = {
      statusCode: 200,
      body: "Updated Birthday Gift",
    };
    return response;
  } catch (e) {
    return e;
  }
};
