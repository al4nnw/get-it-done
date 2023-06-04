import { createStore } from "redux";

interface UserState {
  user: {
    name: string;
    age: number;
    email: string;
  } | null;
}

const SET_USER = "SET_USER";

interface SetUserAction {
  type: typeof SET_USER;
  payload: UserState["user"];
}

const initialState: UserState = {
  user: null,
};

const userReducer = (
  state = initialState,
  action: SetUserAction
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const setUser = (user: UserState["user"]): SetUserAction => ({
  type: SET_USER,
  payload: user,
});

const store = createStore(userReducer);
export default store;
