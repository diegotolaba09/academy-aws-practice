const MIN_CODE = 100;
const MAX_CODE = 999;

const validationDni = (event) => {
  if (!event.dni) {
    throw new Error("Client dni required!");
  }

  return event.dni;
};

const getParams = (dni) => {
  const objectDni = {
    dni: { S: dni },
  };
  const params = {
    Key: objectDni,
    TableName: "diegoTolaba-client",
  };
  return params;
};

const getFormatData = (data) => {
  const formatData = {
    TableName: "diegoTolaba-client",
    Key: { dni: { S: data.dni.S } },
    UpdateExpression: "set #cardType = :c, #expiration = :e, #code = :x",
    ExpressionAttributeNames: {
      "#cardType": "cardType",
      "#expiration": "expiration",
      "#code": "code",
    },
    ExpressionAttributeValues: {
      ":c": data.cardType,
      ":e": data.expiration,
      ":x": data.code,
    },
  };

  return formatData;
};

const getAge = (birthday) => {
  const birthdayArr = birthday.split("/");
  const birthdayDate = new Date(
    birthdayArr[2],
    birthdayArr[1] - 1,
    birthdayArr[0]
  );
  const ageDifMs = Date.now() - birthdayDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const generateCode = () => {
  return Math.floor(Math.random() * (MAX_CODE - MIN_CODE) + MIN_CODE);
};

const getExpiration = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 5);
  const result = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return result;
};

module.exports = {
  validationDni,
  getParams,
  getAge,
  getFormatData,
  generateCode,
  getExpiration,
};
