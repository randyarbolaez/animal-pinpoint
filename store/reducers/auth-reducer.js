import { AUTHENTICATE, LOGOUT } from "../actions/auth-actions";

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };
      break;
    case LOGOUT:
      return initialState;
      break;
    default:
      return state;
      break;
  }
};
