import { Iitem } from "../_types/Iitem.type";
import { item } from "../_types/item.type";

export const filterItemByStatus = (items: item[]) => {
  const filteredItems: Iitem = {
    todo: [],
    inProgress: [],
    done: [],
  };

  items.forEach((item) => {
    filteredItems[item.status].push(item);
  });

  return filteredItems;
};
