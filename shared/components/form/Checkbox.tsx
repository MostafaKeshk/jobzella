interface IProps {
  name: string;
  label: string;
  checked: boolean;
  handleCheck: () => void;
}

const Checkbox: React.FC<IProps> = ({ name, label, checked, handleCheck }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        className="form-checkbox text-primary h-5 w-5"
        checked={checked}
        onChange={handleCheck}
      />
      <label htmlFor={name} className="ml-2 text-lightText">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
