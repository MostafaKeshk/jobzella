import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";

type IProps = {
  text: string;
  modalPath: string;
  className?: string;
};

const AddButton: React.FC<IProps> = ({ text, modalPath, className }) => {
  return (
    <Link
      className={`flex justify-center items-center bg-primary rounded-xl py-3 text-white  disabled:bg-lightPrimary hover:bg-primaryBold transition ${className}`}
      href={modalPath}
    >
      <IoMdAddCircleOutline className="mr-1 text-xl" />
      {text}
    </Link>
  );
};

export default AddButton;
