"use client";

import { useEffect, useMemo, useState } from "react";
import { DragStartEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { findContainer } from "../_utils/findContainer";
import { findItem } from "../_utils/findItem";
import { item } from "../_types/item.type";
import { Iitem } from "../_types/Iitem.type";
import TaskApi from "../_apis/task";
import useCallApi from "@/hooks/useCallApi";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { taskStatus } from "../_utils/taskStatus";

const initItem = {
  _id: "",
  name: "",
  description: "",
  status: "todo",
  groupId: "",
  user: "",
  createdAt: "",
  deadline: "",
  progress: 0,
  files: 0,
  assignedUsers: [],
} as item;

const usePanelContainer = (initItems: Iitem) => {
  const [items, setItems] = useState(initItems);
  const [activeBarColor, setActiveBarColor] = useState("");
  const [activePanelColor, setActivePanelColor] = useState("");

  const { callApi } = useCallApi();
  const { data: session } = useSession();

  useEffect(() => {
    setItems(initItems);
  }, [initItems]);

  const allTasksNumber = useMemo(() => {
    if (items) {
      const todoCount = items.todo ? items.todo.length : 0;
      const inProgressCount = items.inProgress ? items.inProgress.length : 0;
      const doneCount = items.done ? items.done.length : 0;

      return todoCount + inProgressCount + doneCount;
    } else {
      return 0;
    }
  }, [items]);

  const [activeItem, setActiveItem] = useState<item>(initItem);

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event;
    const { id } = active;

    const item = findItem(items, id);
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
    setActiveItem(item);
  };

  const handleDragOver = (event: any): void => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(items, id);
    const overContainer = findContainer(items, overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev: any) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.findIndex((item: any) => item._id === id);
      const overIndex = overItems.findIndex((item: any) => item._id === overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
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
          items[activeContainer as keyof Iitem][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(items, id);
    const overContainer = findContainer(items, overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer as keyof Iitem].findIndex(
      (item: any) => item._id === id
    );
    const overIndex = items[overContainer as keyof Iitem].findIndex(
      (item: any) => item._id === overId
    );

    if (activeIndex !== overIndex) {
      setItems((items: any) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
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
        activeNewPanel: overContainer as keyof Iitem,
      }),
      () => {
        toast.dismiss();
      },
      () => {
        toast.dismiss();
      }
    );
    setActiveItem(initItem);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    items,
    activeItem,
    allTasksNumber,
    activeBarColor,
    activePanelColor,
  };
};

export default usePanelContainer;
