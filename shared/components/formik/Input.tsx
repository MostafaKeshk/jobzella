"use client";

import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

interface IProps {
  formik: any;
  placeholder: string;
  type?: "text" | "password";
  name: string;
  label?: string;
  required?: boolean;
  variant?: "outlined" | "filled";
  Icon?: React.ComponentType<any>;
}

const Input: React.FC<IProps> = ({
  formik,
  placeholder,
  type = "text",
  name,
  label,
  required = false,
  variant = "outlined",
  Icon,
}) => {
  const [visiablity, setVisibility] = useState(false);

  const inputType =
    type === "password" ? (visiablity ? "text" : "password") : "text";

  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 font-bold block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex items-center rounded-lg ${
          variant === "outlined" ? "border px-3" : ""
        }
       ${formik.errors[name] ? "border-red-500" : "border-lightText"}`}
      >
        {Icon && <Icon className="mr-2 text-lightText text-lg" />}
        <input
          type={inputType}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`form-input w-full focus:outline-none rounded-lg py-3 ${
            variant === "outlined" ? "bg-transparent" : "bg-background px-3"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          autoComplete="off"
        />
        <div
          className="cursor-pointer"
          onClick={() => setVisibility(!visiablity)}
        >
          {type === "password" &&
            (visiablity ? (
              <AiOutlineEye className="text-2xl text-lightText" />
            ) : (
              <AiOutlineEyeInvisible className="text-2xl text-lightText" />
            ))}
        </div>
      </div>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default Input;
