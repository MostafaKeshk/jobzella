"use client";

import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

const Dialog = ({ title, onClosePath, children }: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 fade-animation">
      <Link
        href={onClosePath}
        className="fixed inset-0 bg-gray-900 opacity-70 cursor-default"
      />
      <div className="modal-container flex items-center justify-center z-50 min-w-[300px] w-[40%]">
        <div className="bg-white rounded-lg shadow-lg text-black w-full">
          <div className="flex justify-between items-center bg-veryLightPrimary p-4 px-6 rounded-t-lg">
            <h1 className="font-bold text-2xl">{title}</h1>
            <Link href={onClosePath} className=" font-bold rounded">
              <AiOutlineClose />
            </Link>
          </div>

          <div className="modal-content p-4 px-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
