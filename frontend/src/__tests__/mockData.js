import { faker } from '@faker-js/faker';

export const mockUserValid = {
  username: faker.internet.userName(),
  password: 'examplePassword',
  valid: true,
};

export const mockUserInvalid = {
  username: 'invalidUsername',
  password: 'examplePassword',
  valid: false,
};

export const mockSuccessResponse = { status: 200, json: {
    "statusCode": 200,
    "data": {
      "user": {
        "id": 29,
        "username": "raduungurean1",
        "firstName": "Radu",
        "lastName": "Ungurean",
        "email": "radu.ungurean@gmail.com",
        "token": "54c3b29e1d62ec7c65d4ee1e21639a5d4f26c0fab2d8af8be46a196af105eea9",
        "forgetToken": null
      },
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5LCJuYW1lIjoicmFkdXVuZ3VyZWFuMSIsImVtYWlsIjoicmFkdS51bmd1cmVhbkBnbWFpbC5jb20iLCJpYXQiOjE2ODg5ODQ5NDUsIm5iZiI6MTY4ODk4NDk0NSwiZXhwIjoxNzE5NzQzMzQ1fQ._as-xsKHNBhKclG1pK5_kS1nhsGUZB_Monc5CiHXXl8"
    }
  } };

export const mockErrorResponse = { status: 404 };
