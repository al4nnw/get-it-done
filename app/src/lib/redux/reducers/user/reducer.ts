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
  const taskNameModifiedList = state.userTasks.map((task: ITask) =>
    task.taskId === action.payload.taskId
      ? { ...task, taskName: action.payload.taskName }
      : task
  );
  const completedTaskModifiedList = state.userTasks.map((task: ITask) =>
    task.taskId === action.payload.taskId
      ? { ...task, isCompleted: !action.payload.isCompleted }
      : task
  );
  const deleteTaskModifiedList = state.userTasks.filter(
    (task: ITask) => task.taskId !== action.payload.taskId
  );

  switch (action.type) {
    case userActionTypes.LOGIN:
      return { ...state, currentUser: action.payload };
    case userActionTypes.LOGOUT:
      return {
        inicialState,
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
        userTasks: [...taskNameModifiedList],
      };
    case userActionTypes.UPDATE_TASK_STATUS:
      return {
        ...state,
        userTasks: [...completedTaskModifiedList],
      };
    case userActionTypes.DELETE_TASK:
      return {
        ...state,
        userTasks: [...deleteTaskModifiedList],
      };
  }
  return state;
};

export default userReducer;
