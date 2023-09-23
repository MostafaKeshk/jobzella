import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQuerySearch = () => {
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleAddQuery = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };

  const handleRemoveQuery = (name: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);

    router.push(pathname + "?" + params.toString());
  };

  const handleQuery = ({
    add,
    remove,
  }: {
    remove: string[];
    add: { name: string; value: string }[];
  }) => {
    const params = new URLSearchParams(searchParams);

    remove.forEach((name) => {
      params.delete(name);
    });

    add.forEach((item) => {
      params.set(item.name, item.value);
    });

    router.push(pathname + "?" + params.toString());
  };

  return { handleAddQuery, handleRemoveQuery, handleQuery };
};

export default useQuerySearch;
