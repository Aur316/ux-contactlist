import { ButtonProps } from "@/types";
import React from "react";

export default function Button(props: ButtonProps) {
  const baseStyles = "flex justify-around h-[40px] items-center cursor-pointer";

  const width =
    props.text === "double"
      ? "w-[119px]"
      : props.text === "text"
      ? "w-[91px]"
      : "w-[40px]";

  return (
    <button
      className={`${width} ${baseStyles} ${props.radius} ${props.background} ${props.color}`}
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
