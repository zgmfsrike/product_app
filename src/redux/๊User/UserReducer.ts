import {UPDATE_USER_INFO, UserActionTypes, UserState} from './UserType';

//**reducer will do only update or get state
//**logic will be in feature containers

const initialState: UserState = {
  user: [],
};
export const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
