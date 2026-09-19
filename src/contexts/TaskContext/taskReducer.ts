import type { TaskStateModel } from "../../models/TaskModelState";
import { formatSecondToMinutes } from "../../utils/formatSecondToMinutes";
import { getNextCycle } from "../../utils/getNextCycle";
import { initialTaskState } from "./initialTaskState";
import { TaskActionTypes, type TaskActionModel } from "./taskAction";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const secondsRemaining = newTask.duration * 60;
      const nextCycle = getNextCycle(state.currentCycle);

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((item) => {
          if (state.activeTask && state.activeTask.id === item.id) {
            return { ...item, interruptDate: Date.now() };
          }
          return item;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return {
        ...initialTaskState,
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        currentCycle: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((item) => {
          if (state.activeTask && state.activeTask.id === item.id) {
            return { ...item, completeDate: Date.now() };
          }
          return item;
        }),
      };
    }
  }
  return state;
}
