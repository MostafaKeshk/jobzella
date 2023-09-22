type IProps = {
  barColor: string;
  filledColor: string;
  width: string;
  height?: string;
};

const ProgressBar: React.FC<IProps> = ({
  filledColor,
  barColor,
  width,
  height = "h-4",
}) => {
  return (
    <div className={`w-full ${height} rounded-full ${barColor}`}>
      <div
        className={`${filledColor} h-full rounded-full transition-width duration-300`}
        style={{ width }}
      />
    </div>
  );
};

export default ProgressBar;
