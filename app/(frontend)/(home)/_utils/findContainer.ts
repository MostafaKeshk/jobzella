export const findContainer = (
  items: any,
  id: string | number
): string | number | undefined => {
  const itemId = Object.keys(items).find((key) =>
    items[key].some((item: any) => item.id === id)
  );

  if (itemId) return itemId;
  return Object.keys(items).find((key) => id === key);
};
