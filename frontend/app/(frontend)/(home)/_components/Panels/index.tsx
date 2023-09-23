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
import Task from "../Task";
import usePanelContainer from "../../_containers/usePanelContainer";
import TaskMeter from "../Task/TaskMeter";
import AddButton from "@/components/AddButton";
import { ITask } from "../../_types/ITask.type";

type IProps = {
  initTasks: ITask;
};

const Panels: React.FC<IProps> = ({ initTasks }) => {
  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    tasks,
    activeTask,
    allTasksNumber,
    activeBarColor,
    activePanelColor,
  } = usePanelContainer(initTasks);

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
          completedTasksNumber={tasks.done.length}
          allTasksNumber={allTasksNumber}
        />
        <AddButton
          text="Add Task"
          queryKey="createTaskModal"
          className="w-48"
        />
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
              name="To Do"
              tasks={tasks.todo}
              panelColor="bg-todo"
              barColor="bg-lightTodo"
            />
            <Panel
              id="inProgress"
              name="In Progress"
              tasks={tasks.inProgress}
              panelColor="bg-inProgress"
              barColor="bg-lightInProgress"
            />
            <Panel
              id="done"
              name="Done"
              tasks={tasks.done}
              panelColor="bg-done"
              barColor="bg-lightDone"
            />
          </div>
        </div>

        <DragOverlay>
          {activeTask._id ? (
            <Task
              task={activeTask}
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
