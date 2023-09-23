"use client";

import { useStore } from "@/store";

const TwoScreensLayout = ({ Left, Right }: any) => {
  const { openNav } = useStore();

  return (
    <div className="flex min-h-screen bg-background">
      <div
        className={`bg-[#f3f3f3] px-5 transition-all duration-300 ease-in-out md:relative fixed h-screen z-50 ${
          openNav
            ? "translate-x-0 min-w-[300px]"
            : "md:translate-x-0  min-w-[0] md:min-w-[300px] -translate-x-full"
        }`}
      >
        {Left}
      </div>

      <div className="transition-all w-full duration-300 ease-in-out layout-w-right">
        {Right}
      </div>
    </div>
  );
};

export default TwoScreensLayout;
