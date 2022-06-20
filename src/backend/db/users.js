import { v4 as uuid } from "uuid";
import { formatDate } from "backend/utils/authUtils.js";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
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

