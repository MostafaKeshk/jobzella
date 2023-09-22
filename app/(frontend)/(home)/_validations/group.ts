import * as Yup from "yup";

const groupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export default groupSchema;
