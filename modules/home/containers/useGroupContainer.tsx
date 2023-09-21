import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Routes from "@/shared/routes";
import useCallApi from "@/shared/hooks/useCallApi";
import groupSchema from "../validations/group";
import GroupApi from "../apis/group";
import { useSession } from "next-auth/react";
import { ISession } from "@/modules/login/types/session.type";

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

    callApi(GroupApi.create(token, values), () => {
      toast.success("Group created successfully");
      router.push(Routes.home);
    });
  };

  return { formik, loading };
};

export default useGroupContainer;
