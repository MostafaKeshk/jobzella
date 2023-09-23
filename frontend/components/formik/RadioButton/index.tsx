"use client";

type IProps = {
  id: string;
  label: string;
  name: string;
  value: string | number;
  formik: any;
  className?: string;
};

const RadioButton: React.FC<IProps> = ({
  id,
  label,
  name,
  value,
  formik,
  className = "",
}) => {
  const checked = formik.values[name] === value;

  const handleChange = () => {
    formik.setFieldValue(name, value);
  };
  return (
    <div className={`flex items-center ${className}`}>
      <input
        className="hidden"
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onClick={handleChange}
      />
      <label
        htmlFor={id}
        className={`flex items-center cursor-pointer text-sm ${
          checked ? "text-primary font-semibold" : "text-[#7697AB]"
        }`}
      >
        <span
          className={`w-6 h-6 inline-block mr-2 rounded-full border-[3px] ${
            checked ? "bg-primary border-primary" : "border-[#7697AB]"
          }`}
          style={{ boxShadow: "0px 0px 0px 2.5px white inset" }}
        />
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
