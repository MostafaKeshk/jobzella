"use client";

import Dialog from "@/components/Dialog";
import Input from "@/components/formik/Input";
import LoadingButton from "@/components/LoadingButton";
import useGroupContainer from "../../_containers/useGroupContainer";
import useCreateQuerySearch from "@/hooks/useQuerySearch";

const GroupDialog = () => {
  const { formik, loading } = useGroupContainer();
  const { handleRemoveQuery } = useCreateQuerySearch();
  return (
    <Dialog
      title="Add group"
      handleClose={() => handleRemoveQuery("createGroupModal")}
    >
      <form onSubmit={formik.handleSubmit} className="my-3">
        <Input
          formik={formik}
          placeholder="Jobzella"
          name="name"
          label="Name"
          required
          variant="filled"
        />

        <div className="flex justify-center mt-10">
          <LoadingButton
            className="w-80 bg-primary rounded-xl py-3 text-white  disabled:bg-lightPrimary hover:bg-primaryBold transition"
            type="submit"
            loading={loading}
          >
            Add group
          </LoadingButton>
        </div>
      </form>
    </Dialog>
  );
};

export default GroupDialog;
