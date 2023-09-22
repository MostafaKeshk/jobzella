"use client";

import { useState } from "react";
import { DragStartEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { findContainer } from "../_utils/findContainer";
import { findItem } from "../_utils/findItem";

const usePanelContainer = () => {
  const [items, setItems] = useState<any>({
    todo: [
      { id: "1", name: "test" },
      { id: "2", name: "test2" },
    ],
    inProgress: [{ id: "3", name: "test3" }],
    done: [],
  });
  const [activeItem, setActiveItem] = useState<any>({ id: "", name: "" });

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event;
    const { id } = active;

    const item = findItem(items, id);
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

      const activeIndex = activeItems.findIndex((item: any) => item.id === id);
      const overIndex = overItems.findIndex((item: any) => item.id === overId);

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
          ...prev[activeContainer].filter((item: any) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
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

    const activeIndex = items[activeContainer].findIndex(
      (item: any) => item.id === id
    );
    const overIndex = items[overContainer].findIndex(
      (item: any) => item.id === overId
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

    setActiveItem({ id: "", name: "" });
  };

  return { handleDragStart, handleDragOver, handleDragEnd, items, activeItem };
};

export default usePanelContainer;
