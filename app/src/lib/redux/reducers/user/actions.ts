import userActionTypes from "./action-types";

export const setCurrentUser = (payload: object) => ({
  type: userActionTypes.LOGIN,
  payload,
});
export const setCurrentUserNull = () => ({
  type: userActionTypes.LOGIN,
});
export const setCurrentUserTasks = (payload: object) => ({
  type: userActionTypes.SET_TASKS,
  payload,
});
export const addNewTask = (payload: object) => ({
  type: userActionTypes.ADD_TASK,
  payload,
});
export const updateTaskName = (payload: object) => ({
  type: userActionTypes.UPDATE_TASK_NAME,
  payload,
});
export const updateTaskCompleted = (payload: object) => ({
  type: userActionTypes.UPDATE_TASK_STATUS,
  payload,
});
export const deleteTask = (payload: object) => ({
  type: userActionTypes.DELETE_TASK,
  payload,
});
