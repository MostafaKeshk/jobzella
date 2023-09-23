"use client";

import React from "react";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTask from "../Task/SortableTask";
import { task } from "../../_types/task.type";
import AddTaskButton from "../Task/AddTaskButton";

type IProps = {
  id: string;
  tasks: task[];
  panelColor: string;
  barColor: string;
  name: string;
};

const Panel: React.FC<IProps> = ({ id, tasks, panelColor, barColor, name }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={tasks.map((task: any) => task._id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="bg-white w-1/3 mx-2 px-6 pb-4 rounded overflow-y-auto"
        style={{ height: "calc(100vh - 250px)" }}
      >
        <div className="mb-8">
          <div className="flex items-center py-5">
            <div className={`w-2 h-2 rounded-full ${panelColor} mr-2`} />
            <h2 className="text-[#0D062D] font-bold mr-2">{name}</h2>
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full bg-[#E0E0E0] text-[#625F6D] text-xs text-center font-semibold`}
            >
              {tasks.length}
            </span>
          </div>
          <div className={`h-1 w-full ${panelColor}`} />
        </div>
        {tasks.map((task: any) => (
          <SortableTask
            key={task._id}
            task={task}
            panelColor={panelColor}
            barColor={barColor}
          />
        ))}
        <AddTaskButton queryKey="createTaskModal" />
      </div>
    </SortableContext>
  );
};

export default Panel;
