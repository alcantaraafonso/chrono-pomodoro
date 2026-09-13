import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

type TipsProps = {
  nextCycleType: string;
};

export function Tips({ nextCycleType }: TipsProps) {
  const { state } = useTaskContext();
  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        Foque por <b>{state.config.workTime} min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Descanse por <b>{state.config.shortBreakTime} min</b>
      </span>
    ),
    longBreakTime: <span>Descanso longo</span>,
  };

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de foco por <b>{state.config.workTime} min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Próximo ciclo é um descanso curto de
        <b>{state.config.shortBreakTime} min</b>
      </span>
    ),
    longBreakTime: (
      <span>
        Próximo ciclo é um descanso longo de {state.config.longBreakTime} min
      </span>
    ),
  };
  return (
    <>
      {/* True */}
      <p>
        {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      </p>
      {/* false */}
      <p>{!state.activeTask && tipsForNoActiveTask[nextCycleType]}</p>
    </>
  );
}
