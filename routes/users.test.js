// const mock = require('mock-fs');
const { loadJSON } = require('./users');

const mockUsers = [
  {
    "firstName": "Jackie",
    "lastName": "Chan",
    "login": "jackie",
    "pass": "12345"
  }
];

// beforeEach(async () => {
//   mock({
//     'public' : {
//       'sample-users.json': mockUsers,
//     },
//   });
// })

// afterEach(async () => {
//   mock.restore();
// })

describe('Check if users reads JSON file', () => {
  test('Should load sample-users', () => {
    expect.assertions(1);
    return loadJSON(`${__dirname}/../public/sample-users.json`)
      .then(users => expect(users).toEqual(mockUsers));
  });
});

