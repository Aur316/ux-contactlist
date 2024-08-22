import { DropdownProps } from "@/types";
import React from "react";

export default function Dropdown({ values, onDelete }: DropdownProps) {
  return (
    <div>
      {values.map((value) => (
        <div
          key={value}
          onClick={() => {
            if (value === "Remove") {
              onDelete();
            }
          }}
        >
          <img src={`/icons/${value}.png`} alt={value} />
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}
