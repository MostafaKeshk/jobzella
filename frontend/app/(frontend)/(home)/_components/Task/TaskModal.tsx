"use client";

import Dialog from "@/components/Dialog";
import Input from "@/components/formik/Input";
import LoadingButton from "@/components/LoadingButton";
import useTaskContainer from "../../_containers/useTaskContainer";
import TextArea from "@/components/formik/TextArea";
import RadioButton from "@/components/formik/RadioButton";
import { taskStatusList } from "../../_utils/taskStatus";
import RadioButtonGroup from "@/components/formik/RadioButton/Group";
import useCreateQuerySearch from "@/hooks/useQuerySearch";

const TaskDialog = () => {
  const { formik, loading } = useTaskContainer();
  const { handleRemoveQuery } = useCreateQuerySearch();

  return (
    <Dialog
      title="Add task"
      handleClose={() => handleRemoveQuery("createTaskModal")}
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

        <TextArea
          formik={formik}
          placeholder="Write here..."
          name="description"
          label="Description"
          variant="filled"
        />

        <p className="mb-2 font-bold block">
          Choose Status <span className="text-red-500">*</span>
        </p>

        <RadioButtonGroup formik={formik} name="status">
          {taskStatusList.map((status) => (
            <RadioButton
              id={status.value}
              key={status.label}
              name="status"
              value={status.value}
              label={status.label}
              formik={formik}
              className="mr-8 mb-2"
            />
          ))}
        </RadioButtonGroup>

        <div className="flex justify-center mt-10">
          <LoadingButton
            className="w-80 bg-primary rounded-xl py-3 text-white  disabled:bg-lightPrimary hover:bg-primaryBold transition"
            type="submit"
            loading={loading}
          >
            Add task
          </LoadingButton>
        </div>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
