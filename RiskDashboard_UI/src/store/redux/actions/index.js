import * as UserConstants from "../contsants";
import { fetchUser } from "../../api";

export const fetchUserAction = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.FETCH_USER,
    });
    fetchUser(user)
      .then((response) => {
        dispatch({
          type: UserConstants.FETCH_USER_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          payload: err,
          type: UserConstants.FETCH_USER_ERROR,
        });
        reject(err);
      });
  });
};
