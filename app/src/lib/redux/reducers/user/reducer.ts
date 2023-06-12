/* eslint-disable @typescript-eslint/no-explicit-any */
import ITask from "../../../../types/ITask";
import userActionTypes from "./action-types";

const inicialState = {
  currentUser: null,
  userTasks: [],
};

interface IAction {
  type: string;
  payload?: any;
}

const userReducer = (state = inicialState, action: IAction) => {
  switch (action.type) {
    case userActionTypes.LOGIN:
      return { ...state, currentUser: action.payload };
    case userActionTypes.LOGOUT:
      return {
        ...state,
        ...inicialState,
      };
    case userActionTypes.SET_TASKS:
      return {
        ...state,
        userTasks: action.payload,
      };
    case userActionTypes.ADD_TASK:
      return {
        ...state,
        userTasks: [...state.userTasks, action.payload],
      };
    case userActionTypes.UPDATE_TASK_NAME:
      return {
        ...state,
        userTasks: [
          ...state.userTasks.map((task: ITask) =>
            task.taskId === action.payload.taskId
              ? { ...task, taskName: action.payload.taskName }
              : task
          ),
        ],
      };
    case userActionTypes.UPDATE_TASK_STATUS:
      return {
        ...state,
        userTasks: [
          ...state.userTasks.map((task: ITask) =>
            task.taskId === action.payload.taskId
              ? { ...task, isCompleted: !action.payload.isCompleted }
              : task
          ),
        ],
      };
    case userActionTypes.DELETE_TASK:
      return {
        ...state,
        userTasks: [
          ...state.userTasks.filter(
            (task: ITask) => task.taskId !== action.payload.taskId
          ),
        ],
      };
  }
  return state;
};

export default userReducer;
