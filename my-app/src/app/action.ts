import USER from "./constants";
import myData from '../data.json';

export const requestUsers = (data: any) => async (dispatch: any) => {
  dispatch({
    type: USER.LOAD,
  });
  try {
    const json = myData;
    console.log(json);
    dispatch({
      type: USER.LOAD_SUCCESS,
      usersData: json,
      isError: false,
    });
  } catch (e) {
    dispatch({
      type: USER.LOAD_SUCCESS,
      usersData: [],
      isError: true,
    });
  }
};