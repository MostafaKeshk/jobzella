import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  status: Yup.string().required("Status is required"),
});

export default taskSchema;
