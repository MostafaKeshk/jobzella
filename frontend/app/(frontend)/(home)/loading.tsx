import { ImSpinner2 } from "react-icons/im";
const Loading = () => {
  return (
    <div className="w-full h-40 flex justify-center items-center">
      <ImSpinner2 className="inline mr-2 circle-animation" />
    </div>
  );
};

export default Loading;
