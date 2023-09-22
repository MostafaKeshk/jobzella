export const authHeader = (token: string) => {
  return {
    Authorization: `${token}`,
  };
};
