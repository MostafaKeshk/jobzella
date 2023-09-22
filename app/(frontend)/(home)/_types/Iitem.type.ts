import { item } from "./item.type";

export interface Iitem {
  todo: item[];
  inProgress: item[];
  done: item[];
}
