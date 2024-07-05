// @ts-nocheck
import { User } from '.';

export const helper = () => {};

const USERS: User[] = [];

export const addUser = (u) => {
  USERS.push(u);
};

export const getUser = (id) => {
  return USERS.find((u) => u.id === id);
};
