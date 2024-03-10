import { UnknownAction } from "@reduxjs/toolkit";
import USER from "./constants";

const initalState = {
  usersData: [],
  isLoading: false,
  isError: false,
};


const userReducer = (state = initalState as unknown, action: UnknownAction): unknown => {
  switch (action.type) {
    case USER.LOAD:
      return {
        ...state as object,
        isLoading: true,
        isError: false,
      };
    case USER.LOAD_SUCCESS:
      return {
        ...state as object,
        usersData: action.usersData,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
