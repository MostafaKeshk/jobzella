export const findContainer = (
  items: any,
  id: string | number
): string | number | undefined => {
  const itemId = Object.keys(items).find((key: any) =>
    items[key].some((item: any) => item._id === id)
  );

  if (itemId) return itemId;
  return Object.keys(items).find((key: any) => id === key);
};
