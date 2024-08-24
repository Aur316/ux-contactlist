import { ButtonProps } from "@/types";
import React from "react";

export default function Button(props: ButtonProps) {
  const baseStyles =
    "flex justify-around h-[40px] items-center transition-colors duration-200";

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={` ${baseStyles} ${props.className} hover:bg-G-50 active:bg-G-40`}
    >
      {props.text !== "text" && <img src={props.icon} alt="icon" />}
      {props.text !== "icon" && (
        <span
          className={`font-normal text-sm leading-[17.5px] font-lexend ${
            props.disabled ? "text-disabled" : "text-primary"
          }`}
        >
          {" "}
          {props.value}
        </span>
      )}
    </button>
  );
}
