import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Harshna",
    lastName: "Haswani",
    email: "hharshna.n@gmail.com",
    password: "harshna1n",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Guest",
    lastName: "user",
    email: "test@gmail.com",
    password: "12345678",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];

// "email": "hharshna.n@gmail.com",
// "password": "harshna1n"
