import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Routes from "@/routes";
import useCallApi from "@/hooks/useCallApi";
import groupSchema from "../_validations/group";
import GroupApi from "../_apis/group";
import { useSession } from "next-auth/react";

const useGroupContainer = () => {
  const router = useRouter();

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
      router.push(Routes.getGroup(data.group._id));
      router.refresh();
    });
  };

  return { formik, loading };
};

export default useGroupContainer;
