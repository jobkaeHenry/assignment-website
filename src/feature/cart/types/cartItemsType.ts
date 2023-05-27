import { ItemType } from "../../items/types/itemDataTypes";

export interface CartItemType {
  itemInfo: { _id: string } & Omit<ItemType, "id">;
  quantity: number;
}
