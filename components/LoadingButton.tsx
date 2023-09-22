import { ImSpinner2 } from "react-icons/im";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  className?: string;
}

const LoadingButton: React.FC<IProps> = ({ loading, className, ...props }) => {
  return (
    <button disabled={loading} className={className}>
      {loading && <ImSpinner2 className="inline mr-2 circle-animation" />}
      {props.children}
    </button>
  );
};

export default LoadingButton;
