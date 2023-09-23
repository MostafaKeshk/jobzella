import { useFormik } from "formik";
import { toast } from "react-toastify";
import useCallApi from "@/hooks/useCallApi";
import groupSchema from "../_validations/group";
import GroupApi from "../_apis/group";
import { useSession } from "next-auth/react";
import useQuerySearch from "@/hooks/useQuerySearch";

const useGroupContainer = () => {
  const { handleQuery } = useQuerySearch();

  const { data: session } = useSession();
  const { callApi, loading } = useCallApi();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: groupSchema,
  });

  const handleSubmit = (values: any) => {
    const { token } = session as any;

    callApi(GroupApi.create(token, values), (data: any) => {
      toast.success("Group created successfully");
      handleQuery({
        add: [{ name: "group", value: data.group._id }],
        remove: ["createGroupModal", "group"],
      });
    });
  };

  return { formik, loading };
};

export default useGroupContainer;
