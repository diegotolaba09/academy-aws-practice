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

const getBirthdayGift = (birthday) => {
  const birthdayArr = birthday.split("/");
  const season = getSeason(birthdayArr[1]);
  return {
    Otoño: "Buzo",
    Invierno: "Sweater",
    Primavera: "Camisa",
    Verano: "Remera",
  }[season];
};

const getSeason = (month) => {
  if (3 <= month && month <= 5) {
    return "Otoño";
  }

  if (6 <= month && month <= 8) {
    return "Invierno";
  }

  if (9 <= month && month <= 11) {
    return "Primavera";
  }
  return "Verano";
};

const getFormatData = (data, gift) => {
  const formatData = {
    TableName: "diegoTolaba-client",
    Key: { dni: { S: data.Item.dni.S } },
    UpdateExpression: "set #gift = :g",
    ExpressionAttributeNames: {
      "#gift": "gift",
    },
    ExpressionAttributeValues: {
      ":g": { S: gift },
    },
  };
  return formatData;
};

module.exports = { getBirthdayGift, validationDni, getParams, getFormatData };
