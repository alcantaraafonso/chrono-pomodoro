/*
FizzBuzz
Multiplo de 5 -> Fizz
Multiplo de 3 -> Buzz
Multiplo de 3 e 5 -> FizzBuzz
*/

import type { TaskModel } from "../models/TaskModel";

export function getNextCycleType(currentCycle: number): TaskModel["type"] {
  if (currentCycle % 8 === 0) return "longBreakTime";
  if (currentCycle % 2 === 0) return "shortBreakTime";
  return "workTime";
}
