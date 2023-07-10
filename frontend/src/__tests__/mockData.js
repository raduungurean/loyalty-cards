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

export const mockCardsSuccessResponse = {
  status: 200,
  json: {
    "statusCode": 200,
    "data": [
      {
        "id": 21,
        "uid": 29,
        "title": "Molestias omnis odio autem nihil est asperiores.asda",
        "color": "#da8e8e",
        "barcode": "8888014727166",
        "icon": null,
        "description": "asdasdasdasasdasdasdasdas",
        "created_at": {
          "date": "2023-06-22 08:00:01.000000",
          "timezone_type": 3,
          "timezone": "UTC"
        },
        "updated_at": {
          "date": "2023-06-30 11:55:15.000000",
          "timezone_type": 3,
          "timezone": "UTC"
        }
      },
      {
        "id": 27,
        "uid": 29,
        "title": "aasd asdasd asdasd asdasd asdsadasd asdsadasd sadasdsad",
        "color": "#625d5d",
        "barcode": "8888014727166",
        "icon": null,
        "description": "sadsadsa asdasdas sadsadasd asdasdasd asdasdas asdsadasd asdas",
        "created_at": {
          "date": "2023-06-27 11:43:39.000000",
          "timezone_type": 3,
          "timezone": "UTC"
        },
        "updated_at": {
          "date": "2023-06-30 11:55:32.000000",
          "timezone_type": 3,
          "timezone": "UTC"
        }
      },
      {
        "id": 28,
        "uid": 29,
        "title": "sAAAA dfsdfsdf sdfsdfsd sdfsdfsd EEE",
        "color": null,
        "barcode": "8888014727166",
        "icon": null,
        "description": "dfsdfsdf sdfsdfsd sdfsdfs BBB sadsad",
        "created_at": {
          "date": "2023-06-29 05:18:46.000000",
          "timezone_type": 3,
          "timezone": "UTC"
        },
        "updated_at": {
          "date": "2023-06-29 06:21:36.000000",
          "timezone_type": 3,
          "timezone": "UTC"
        }
      },
      {
        "id": 29,
        "uid": 29,
        "title": "dfgsgdfdfgdfg dfgdfgdf",
        "color": null,
        "barcode": "8888014727166",
        "icon": null,
        "description": "dfgdfgdf\ndfgdfgdf",
        "created_at": {
          "date": "2023-06-29 06:22:19.000000",
          "timezone_type": 3,
          "timezone": "UTC"
        },
        "updated_at": {
          "date": "2023-06-29 06:22:19.000000",
          "timezone_type": 3,
          "timezone": "UTC"
        }
      }
    ]
  }
}
