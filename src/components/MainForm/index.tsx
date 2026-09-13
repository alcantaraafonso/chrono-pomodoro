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
import { TaskActionTypes } from "../../contexts/TaskContext/taskAction";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/toastifyWrapper";

export function MainForm() {
  //  const [taskName, setTaskName] = useState("");

  const { state, dispatch } = useTaskContext();

  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  //ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: { preventDefault: () => void }) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warning("Digite o nome da tarefa");
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

    showMessage.success("Tarefa iniciada");
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    showMessage.dismiss();

    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    showMessage.error("Tarefa interrompida");
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
          defaultValue={lastTaskName}
        />
      </div>
      <div className={styles.formRow}>
        <Tips nextCycleType={nextCycleType} />
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
