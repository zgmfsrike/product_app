export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
//**define product interface, init state and action

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  isActive?: boolean;
}

export interface UserStatus {
  id: string;
  isActive: boolean;
}

export interface UserState {
  user: User[];
}

interface UpdateUserInfoActionType {
  type: typeof UPDATE_USER_INFO;
  payload: User[];
}

export type UserActionTypes = UpdateUserInfoActionType;
