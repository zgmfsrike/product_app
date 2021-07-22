import {
  UPDATE_USER_INFO,
  ADD_USER,
  UserActionTypes,
  UserState,
} from './UserType';

//**reducer will do only update or get state
//**logic will be in feature containers

const initialState: UserState = {
  user: [],
};
export const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
