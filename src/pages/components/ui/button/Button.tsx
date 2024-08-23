import { ButtonProps } from "@/types";
import React from "react";

export default function Button(props: ButtonProps) {
  const baseStyles = "flex justify-around h-[40px] items-center cursor-pointer";

  return (
    <button
      onClick={props.onClick}
      className={` ${baseStyles} ${props.className}  `}
    >
      {props.text !== "text" && <img src={props.icon} alt="icon" />}
      {props.text !== "icon" && (
        <span className="font-normal text-sm leading-[17.5px] font-lexend text-primary">
          {props.value}
        </span>
      )}
    </button>
  );
}
