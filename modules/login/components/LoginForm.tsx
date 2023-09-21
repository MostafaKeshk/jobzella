"use client";

import { TfiEmail } from "react-icons/tfi";
import { BiLock } from "react-icons/bi";

import useLoginContainer from "../containers/useLoginContainer";
import Input from "@/shared/components/formik/Input";
import Checkbox from "@/shared/components/form/Checkbox";
import LoadingButton from "@/shared/components/LoadingButton";

const LoginForm = () => {
  const { formik, rememberMe, handleRememberMe, loading } = useLoginContainer();
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input formik={formik} placeholder="Email" name="email" Icon={TfiEmail} />
      <Input
        formik={formik}
        placeholder="Password"
        name="password"
        type="password"
        Icon={BiLock}
      />
      <div className="flex justify-between">
        <Checkbox
          checked={rememberMe}
          handleCheck={handleRememberMe}
          name="remember-me"
          label="Rememeber Me"
        />
        <p className="text-lightPrimary hover:underline cursor-pointer">
          Forgot Password?
        </p>
      </div>
      <LoadingButton
        className="w-full bg-primary rounded-xl py-3 text-white mt-16 disabled:bg-lightPrimary hover:bg-primaryBold transition"
        type="submit"
        loading={loading}
      >
        Login
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
