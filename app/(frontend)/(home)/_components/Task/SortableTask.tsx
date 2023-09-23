"use client";

import React from "react";

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import Task from ".";
import { task } from "../../_types/task.type";

type IProps = {
  task: task;
  panelColor: string;
  barColor: string;
};

const SortableTask: React.FC<IProps> = ({ task, panelColor, barColor }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task task={task} panelColor={panelColor} barColor={barColor} />
    </div>
  );
};

export default SortableTask;
