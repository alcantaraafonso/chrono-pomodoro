import { SaveIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import styles from "./styles.module.css";
import { useRef } from "react";
import { showMessage } from "../../adapters/toastifyWrapper";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskActionTypes } from "../../contexts/TaskContext/taskAction";

export function SettingsForm() {
  const { state, dispatch } = useTaskContext();

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    const workTimeValue = Number(workTimeInput.current?.value);
    const shortBreakTimeValue = Number(shortBreakTimeInput.current?.value);
    const longBreakTimeValue = Number(longBreakTimeInput.current?.value);
    const formErrors = [];

    // if (isNaN(workTimeValue)) {
    //   formErrors.push("Preencha um valor válido para Foco");
    // }

    // if (isNaN(shortBreakTimeValue)) {
    //   formErrors.push("Preencha um valor válido para descanso curto");
    // }

    // if (isNaN(longBreakTimeValue)) {
    //   formErrors.push("Preencha um valor válido para descanso longo");
    // }

    if (workTimeValue < 1 || workTimeValue > 60) {
      formErrors.push("O intervalo permitido para FOCO é entre 1 a 60 minutos");
    }
    if (shortBreakTimeValue < 1 || shortBreakTimeValue > 15) {
      formErrors.push(
        "O intervalo permitido para descanso CURTO é entre 1 a 15 minutos",
      );
    }

    if (longBreakTimeValue < 1 || longBreakTimeValue > 30) {
      formErrors.push(
        "O intervalo permitido para descanso LONGO é entre 1 a 30 minutos",
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime: workTimeValue,
        shortBreakTime: shortBreakTimeValue,
        longBreakTime: longBreakTimeValue,
      },
    });
    showMessage.success("Configurações salvas");
  }

  return (
    <form className={styles.form} action="" onSubmit={handleSaveSettings}>
      <div className={styles.formRow}>
        <DefaultInput
          id="workTime"
          labelText="Foco"
          ref={workTimeInput}
          type="number"
          // disabled={!!state.activeTask}
          defaultValue={state.config.workTime}
        />
      </div>
      <div className={styles.formRow}>
        <DefaultInput
          id="shortBreakTime"
          labelText="Descanso curto"
          type="number"
          ref={shortBreakTimeInput}
          //   disabled={!!state.activeTask}
          defaultValue={state.config.shortBreakTime}
        />
      </div>
      <div className={styles.formRow}>
        <DefaultInput
          id="longBreakTime"
          labelText="Descanso longo"
          type="number"
          ref={longBreakTimeInput}
          //   disabled={!!state.activeTask}
          defaultValue={state.config.longBreakTime}
        />
      </div>
      <div className={styles.formRow}>
        <DefaultButton
          color="green"
          aria-label="Salvar"
          title="Salvar configurações"
          type="submit"
          key="botao_submit"
        >
          <SaveIcon />
        </DefaultButton>
      </div>
    </form>
  );
}
