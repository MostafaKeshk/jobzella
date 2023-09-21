"use client";

import React from "react";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Panel = ({ id, items }: any) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items.map((item: any) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="bg-background h-[90vh] w-1/3 mx-2">
        {items.map((item: any) => (
          <SortableItem key={item.id} item={item} />
        ))}
      </div>
    </SortableContext>
  );
};

export default Panel;
