"use client";

import ProgressBar from "@/components/ProgressBar";
import { AiFillStar } from "react-icons/ai";

type IProps = {
  completedTasksNumber: number;
  allTasksNumber: number;
};

const TaskMeter: React.FC<IProps> = ({
  completedTasksNumber,
  allTasksNumber,
}) => {
  const width = allTasksNumber
    ? `${(completedTasksNumber / allTasksNumber) * 100}%`
    : `0%`;
  return (
    <div>
      <p>
        Task Meter
        <span className="ml-2 text-blue-500 font-semibold">
          {completedTasksNumber}
        </span>
        /{allTasksNumber}
      </p>
      <div className="flex items-center">
        <div className="xl:w-96 lg:w-80 md:w-60 w-40 my-4">
          <ProgressBar
            filledColor="bg-primary"
            barColor="bg-veryLightPrimary"
            width={width}
          />
        </div>
        <div className="flex items-center mx-2">
          <AiFillStar className="text-inProgress" />
          <p className="ml-1 text-inProgress text-sm">Good Job!</p>
        </div>
      </div>
    </div>
  );
};

export default TaskMeter;
