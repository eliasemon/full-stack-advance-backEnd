const { faker } = require("@faker-js/faker");

const generateFakeProfile = (userProperties) => {
  const generatedProperties = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    age: faker.datatype.number({ min: 18, max: 65 }),
    address: faker.address.streetAddress(),
  };
  const person = {};
  userProperties.forEach((property) => {
    if (generatedProperties.hasOwnProperty(property.toLowerCase())) {
      person[property] = generatedProperties[property];
    }
  });

  return person;
};

const countChars = (str) => {
  const result = {
    input: str.trim(),
    letters: 0,
    symbols: 0,
    numbers: 0,
  };
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (/[a-zA-Z]/.test(char)) {
      result.letters++;
    } else if (/\d/.test(char)) {
      result.numbers++;
    } else {
      result.symbols++;
    }
  }

  return result;
};

const generateRandomNumber = (start, end) => {
  return start + Math.floor(Math.random() * (end - start));
};

module.exports = { generateRandomNumber, countChars, generateFakeProfile };
