const MAX_AGE = 65;
const MIN_AGE = 18;

const validationData = (event) => {
  if (!event.dni || !event.firstName || !event.lastName || !event.birthday) {
    throw new Error("All fields are required!");
  }
  const age = getAge(event.birthday);

  if (age > MAX_AGE || age < MIN_AGE) {
    throw new Error("Age not required!");
  }
  return event;
};

const getParams = (data) => {
  const items = {
    dni: { S: data.dni },
    firstName: { S: data.firstName },
    lastName: { S: data.lastName },
    birthday: { S: data.birthday },
  };
  const params = {
    TableName: "diegoTolaba-client",
    Item: items,
  };
  return params;
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

module.exports = { validationData, getParams };
