"use client"; // Error components must be Client Components

import { useEffect } from "react";
import ErrorSvg from "./_svgs/Error";
import GroupDialog from "./_components/GroupList/GroupDialog";
import { useSearchParams } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const searchParams = useSearchParams();
  const showCreateGroupModal = searchParams.get("createGroupModal");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <ErrorSvg />
        <h2 className="text-primary text-xl text-center my-4">
          Something went wrong!
        </h2>
        <button
          className="w-40 flex justify-center items-center bg-primary rounded-xl py-3 text-white  disabled:bg-lightPrimary hover:bg-primaryBold transition "
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>

      {showCreateGroupModal && <GroupDialog />}
    </>
  );
}
