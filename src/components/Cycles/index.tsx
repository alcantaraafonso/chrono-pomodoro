import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });
  const cycleDescriptionMap = {
    workTime: "Foco",
    shortBreakTime: "Descanso curto",
    longBreakTime: "Descanso longo",
  };
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={`${nextCycle}_${nextCycleType}`}
              aria-label={`Indicador de ciclo ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo ${cycleDescriptionMap[nextCycleType]}`}
              className={`${styles.cicleDot} ${styles[nextCycleType]}`}
            ></span>
          );
        })}
        {/* <span className={`${styles.cicleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cicleDot} ${styles.longBreakTime}`}></span> */}
      </div>
    </div>
  );
}
