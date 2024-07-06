import * as UserConstants from "../contsants";
import { getTodo, addOrUpdateTodo,deleteTodoList } from "../../api/todo";

export const getTodoAction = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    getTodo(user)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_TODO_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addOrUploadTodo = (data) => (dispatch) => {
  return new Promise((resolve) => {
    addOrUpdateTodo(data).then((response) => {
      dispatch({
        type: UserConstants.GET_TODO_ADD,
        payload: response.data,
      });
      resolve(response);
    });
  });
};
export const deleteTodo = (data) => (dispatch) => {
  return new Promise((resolve) => {
    deleteTodoList(data).then((response) => {
      dispatch({
        type: UserConstants.GET_TODO_DELETED,
        payload: response.data,
      });
      resolve(response);
    });
  });
};
