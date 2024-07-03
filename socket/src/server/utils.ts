// @ts-nocheck

export type User = {
  id: string;
  name: string;
  room: string;
};

export const USERS: User[] = [];

export const joinUser = (u: User) => {
  USERS.push(u);
};

export const getUser = (id): User | undefined => {
  return USERS.find((u) => u.id === id);
};

export const removeUser = (id) => {
  const i = USERS.findIndex((u) => u.id === id);
  if (i !== -1) {
    USERS.splice(i, 1);
  }
};

export const getRoomUsers = (id) => {
  return USERS.filter((u) => u.room === id);
};
