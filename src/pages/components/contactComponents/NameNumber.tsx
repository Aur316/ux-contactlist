import { NameNumberProps } from "@/types";
import React from "react";

export default function NameNumber({ name, phone }: NameNumberProps) {
  const formattedPhone = phone
    ? phone.toString().startsWith("+")
      ? phone.toString()
      : `+${phone}`
    : "";

  return (
    <div className="h-10 flex flex-col">
      <span
        id="contactName"
        className="font-normal text-base leading-6 tracking-wide text-primary font-lexend overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </span>
      <span
        id="contactNumber"
        className="font-normal text-xs leading-4 tracking-wide font-lexend text-secondary"
      >
        {formattedPhone}
      </span>
    </div>
  );
}
