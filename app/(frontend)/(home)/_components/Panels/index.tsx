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
import TaskMeter from "./TaskMeter";
import AddButton from "@/components/AddButton";
import { Iitem } from "../../_types/Iitem.type";

type IProps = {
  selectedGroupId: string;
  initItems: Iitem;
};

const Panels: React.FC<IProps> = ({ selectedGroupId, initItems }) => {
  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    items,
    activeItem,
    allTasksNumber,
    activeBarColor,
    activePanelColor,
  } = usePanelContainer(initItems);

  const modalPath = !!selectedGroupId
    ? `/?group=${selectedGroupId}&createTaskModal=true`
    : "/?createTaskModal=true";

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <div className="flex justify-between items-center my-6 flex-wrap">
        <TaskMeter
          completedTasksNumber={items.done.length}
          allTasksNumber={allTasksNumber}
        />
        <AddButton text="Add Task" modalPath={modalPath} className="w-48" />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto">
          <div className="flex min-w-[1000px]">
            <Panel
              id="todo"
              name="Todo"
              items={items.todo}
              panelColor="bg-todo"
              barColor="bg-lightTodo"
            />
            <Panel
              id="inProgress"
              name="In Progress"
              items={items.inProgress}
              panelColor="bg-inProgress"
              barColor="bg-lightInProgress"
            />
            <Panel
              id="done"
              name="Done"
              items={items.done}
              panelColor="bg-done"
              barColor="bg-lightDone"
            />
          </div>
        </div>

        <DragOverlay>
          {activeItem._id ? (
            <Item
              item={activeItem}
              panelColor={activePanelColor}
              barColor={activeBarColor}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default Panels;
