export const findItem = (
  items: any,
  id: string | number
): string | number | undefined => {
  const itemId: any = Object.entries(items).find(([key, value]: any) =>
    value.some((item: any) => item.id === id)
  );

  if (itemId)
    return itemId[1].find((i: any) => i.id === id) || { id: "", name: "" };
};
