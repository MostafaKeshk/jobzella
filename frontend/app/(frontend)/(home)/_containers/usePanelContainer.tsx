"use client";

import { useEffect, useMemo, useState } from "react";
import { DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { findTaskList } from "../_utils/findTaskList";
import { findTask } from "../_utils/findTask";
import { ITask } from "../_types/ITask.type";
import TaskApi from "../_apis/task";
import useCallApi from "@/hooks/useCallApi";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { taskStatus } from "../_utils/taskStatus";
import { initTask } from "../_utils/inits";
import { task } from "../_types/task.type";

const usePanelContainer = (initTasks: ITask) => {
  const [tasks, setTasks] = useState(initTasks);
  const [activeBarColor, setActiveBarColor] = useState("");
  const [activePanelColor, setActivePanelColor] = useState("");

  const { callApi } = useCallApi();
  const { data: session } = useSession();

  useEffect(() => {
    setTasks(initTasks);
  }, [initTasks]);

  const allTasksNumber = useMemo(() => {
    if (tasks) {
      const todoCount = tasks.todo ? tasks.todo.length : 0;
      const inProgressCount = tasks.inProgress ? tasks.inProgress.length : 0;
      const doneCount = tasks.done ? tasks.done.length : 0;

      return todoCount + inProgressCount + doneCount;
    } else {
      return 0;
    }
  }, [tasks]);

  const [activeTask, setActiveTask] = useState<task>(initTask);

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event;
    const { id } = active;

    const item = findTask(tasks, id);
    if (item.status === taskStatus.todo) {
      setActiveBarColor("bg-lightTodo");
      setActivePanelColor("bg-todo");
    } else if (item.status === taskStatus.inProgress) {
      setActiveBarColor("bg-lightInProgress");
      setActivePanelColor("bg-inProgress");
    } else {
      setActiveBarColor("bg-lightDone");
      setActivePanelColor("bg-done");
    }
    setActiveTask(item);
  };

  const handleDragOver = (event: any): void => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findTaskList(tasks, id);
    const overContainer = findTaskList(tasks, overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setTasks((prev: any) => {
      const activeTasks = prev[activeContainer];
      const overTasks = prev[overContainer];

      const activeIndex = activeTasks.findIndex((item: any) => item._id === id);
      const overIndex = overTasks.findIndex((item: any) => item._id === overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overTasks.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overTasks.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overTasks.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter(
            (item: any) => item._id !== active.id
          ),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          tasks[activeContainer as keyof ITask][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findTaskList(tasks, id);
    const overContainer = findTaskList(tasks, overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = tasks[activeContainer as keyof ITask].findIndex(
      (item: any) => item._id === id
    );
    const overIndex = tasks[overContainer as keyof ITask].findIndex(
      (item: any) => item._id === overId
    );

    if (activeIndex !== overIndex) {
      setTasks((tasks: any) => ({
        ...tasks,
        [overContainer]: arrayMove(
          tasks[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    toast.loading("Loading...");
    const { token } = session as any;

    callApi(
      TaskApi.sort(token, {
        activeId: id,
        overId,
        activeNewPanel: overContainer as keyof ITask,
      }),
      () => {
        toast.dismiss();
      },
      () => {
        toast.dismiss();
      }
    );
    setActiveTask(initTask);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    tasks,
    activeTask,
    allTasksNumber,
    activeBarColor,
    activePanelColor,
  };
};

export default usePanelContainer;
