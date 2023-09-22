"use client";

import React from "react";

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";
import { item } from "../../_types/item.type";

type IProps = {
  item: item;
  panelColor: string;
  barColor: string;
};

const SortableItem: React.FC<IProps> = ({ item, panelColor, barColor }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item item={item} panelColor={panelColor} barColor={barColor} />
    </div>
  );
};

export default SortableItem;
