import { useFormik } from "formik";
import loginSchema from "../validations/login";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Routes from "@/shared/routes";

const useLoginContainer = () => {
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await signIn("credentials", {
          ...values,
          redirect: false,
          // callbackUrl: Routes.home,
        }).then((resp: any) => {
          if (!resp.error) {
            router.push(Routes.home);
          } else {
            toast.error(resp.error);
          }
        });
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: loginSchema,
  });

  const handleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };
  return { formik, rememberMe, handleRememberMe, loading };
};

export default useLoginContainer;
