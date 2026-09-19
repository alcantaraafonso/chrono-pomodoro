import styles from "./styles.module.css";

import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortedTasks";
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/toastifyWrapper";
import { TaskActionTypes } from "../../contexts/TaskContext/taskAction";

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);

  const hasTask = state.tasks.length > 0;

  // const sortedTasks = sortTasks({ tasks: state.tasks });
  const [sortedTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    },
  );

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => showMessage.dismiss();
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection =
      sortedTasksOptions.direction === "desc" ? "asc" : "desc";
    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortedTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    // if (!confirm("Tem certeza?")) return;
    showMessage.dismiss();
    showMessage.confirm(
      "Tem certeza que deseja apagar todo o histórico?",
      (confirmation) => {
        setConfirmClearHistory(confirmation);
      },
    );
  }

  useEffect(() => {
    setSortTasksOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTask && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                color="red"
                aria-label="Apagar todo o histórico"
                title="Apagar histórico"
                onClick={handleResetHistory}
              >
                <TrashIcon />
              </DefaultButton>
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTask && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: "name" })}
                    className={styles.thSort}
                  >
                    Tarefa
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: "duration" })}
                    className={styles.thSort}
                  >
                    Duração
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: "startDate" })}
                    className={styles.thSort}
                  >
                    Data
                  </th>
                  <th>Status</th>
                  <th
                    onClick={() => handleSortTasks({ field: "type" })}
                    className={styles.thSort}
                  >
                    Tipo
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedTasksOptions.tasks.map((task) => {
                  const taskTypeDictionary = {
                    workTime: "Foco",
                    shortBreakTime: "Descanso curto",
                    longBreakTime: "Descanso longo",
                  };
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTask && (
          <p className={styles.textHasTask}>Não há tarefas criadas</p>
        )}
      </Container>
    </MainTemplate>
  );
}
