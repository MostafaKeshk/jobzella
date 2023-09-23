import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import useCallApi from "@/hooks/useCallApi";
import taskSchema from "../_validations/task";
import TaskApi from "../_apis/task";
import { useSession } from "next-auth/react";
import useCreateQuerySearch from "@/hooks/useQuerySearch";

const useTaskContainer = () => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");
  const { handleRemoveQuery } = useCreateQuerySearch();
  const router = useRouter();
  const { data: session } = useSession();
  const { callApi, loading } = useCallApi();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      status: "",
      groupId,
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: taskSchema,
  });

  const handleSubmit = (values: any) => {
    const { token } = session as any;

    callApi(TaskApi.create(token, values), () => {
      toast.success("Task created successfully");
      handleRemoveQuery("createTaskModal");
      router.refresh();
    });
  };

  return { formik, loading };
};

export default useTaskContainer;
