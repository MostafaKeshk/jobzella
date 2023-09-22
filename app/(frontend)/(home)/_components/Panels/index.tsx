"use client";

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Panel from "./Panel";
import Item from "./Item";
import usePanelContainer from "../../_containers/usePanelContainer";

const Panels = () => {
  const { handleDragStart, handleDragOver, handleDragEnd, items, activeItem } =
    usePanelContainer();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex w-[1280px]">
        <Panel id="todo" items={items.todo} />
        <Panel id="inProgress" items={items.inProgress} />
        <Panel id="done" items={items.done} />
      </div>

      <DragOverlay>
        {activeItem.id ? (
          <Item id={activeItem.id} name={activeItem.name} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Panels;
