import { UnknownAction } from "@reduxjs/toolkit";
import USER from "./constants";

export interface IData {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: {
      customer: string;
      review: string;
      score: number;
  }[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: {
      weekEnding: string;
      retailSales: number;
      wholesaleSales: number;
      unitsSold: number;
      retailerMargin: number;
  }[];
}

export interface ISelectorState {
  usersData?: IData[],
  isLoading: boolean,
  isError: boolean,
}

const initalState = {
  usersData: undefined,
  isLoading: true,
  isError: false,
} as ISelectorState;

const userReducer = (state = initalState as unknown, action: UnknownAction): unknown => {
  switch (action.type) {
    case USER.LOAD:
      return {
        ...state as object,
        usersData: undefined,
        isLoading: true,
        isError: false,
      } as ISelectorState;
    case USER.LOAD_SUCCESS:
      return {
        ...state as object,
        usersData: action.usersData,
        isLoading: false,
      } as ISelectorState;
    default:
      return state;
  }
};

export default userReducer;
