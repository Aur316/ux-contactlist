import { NameNumberProps } from "@/types";
import React from "react";

export default function NameNumber({ name, phone }: NameNumberProps) {
  const formattedPhone = phone.toString().startsWith("+")
    ? phone.toString()
    : `+${phone}`;

  return (
    <div className="h-10 flex flex-col">
      <span
        id="contactName"
        className="font-normal text-base leading-6 tracking-wide text-primary font-lexend"
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
