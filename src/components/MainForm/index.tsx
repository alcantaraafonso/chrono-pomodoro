import styles from "./styles.module.css";

import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondToMinutes } from "../../utils/formatSecondToMinutes";
import { TaskActionTypes } from "../../contexts/TaskContext/taskAction";

export function MainForm() {
  //  const [taskName, setTaskName] = useState("");

  const { state, dispatch } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement>(null);

  //ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert("Digite o nome da tarefa");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form className={styles.form} action="" onSubmit={handleCreateNewTask}>
      <div className={styles.formRow}>
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="Task"
          placeholder="Digite algo"
          // value={taskName}
          // onChange={(e) => setTaskName(e.target.value)}
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      <div className={styles.formRow}>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask && (
          <DefaultButton
            color="green"
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            type="submit"
            key="botao_submit"
          >
            <PlayCircleIcon />
          </DefaultButton>
        )}
        {!!state.activeTask && (
          <DefaultButton
            color="red"
            type="button"
            aria-label="Interromper tarefa"
            title="Interromper tarefa"
            onClick={handleInterruptTask}
            key="botao_interrupt"
          >
            <StopCircleIcon />
          </DefaultButton>
        )}
      </div>
    </form>
  );
}
