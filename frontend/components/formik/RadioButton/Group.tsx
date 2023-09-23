type IProps = {
  children: any;
  name: string;
  formik: any;
};

const RadioButtonGroup: React.FC<IProps> = ({ children, name, formik }) => {
  return (
    <div>
      <div className="flex items-center my-4 flex-wrap">{children}</div>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default RadioButtonGroup;
