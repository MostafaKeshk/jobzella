"use client";

interface IProps {
  formik: any;
  placeholder: string;
  name: string;
  label?: string;
  required?: boolean;
  variant?: "outlined" | "filled";
}

const TextArea: React.FC<IProps> = ({
  formik,
  placeholder,
  name,
  label,
  required = false,
  variant = "outlined",
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 font-bold block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex items-center rounded-lg ${
          variant === "outlined" ? "border px-3" : ""
        }
       ${formik.errors[name] ? "border-red-500" : "border-lightText"}`}
      >
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={`form-input w-full focus:outline-none rounded-lg py-3 resize-none h-36 ${
            variant === "outlined" ? "bg-transparent" : "bg-[#F5F6F6] px-3"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          autoComplete="off"
        />
      </div>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default TextArea;
