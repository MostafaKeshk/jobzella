import { Iitem } from "../_types/Iitem.type";
import { item } from "../_types/item.type";

const initItem = {
  _id: "",
  name: "",
  description: "",
  status: "todo",
  groupId: "",
  user: "",
  createdAt: "",
} as item;

export const findItem = (items: Iitem, id: string | number): item => {
  const itemId: any = Object.entries(items).find(([key, value]: any) =>
    value.some((item: any) => item._id === id)
  );

  if (itemId) {
    return itemId[1].find((i: any) => i._id === id);
  }
  return initItem;
};
