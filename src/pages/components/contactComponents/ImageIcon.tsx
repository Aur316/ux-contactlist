import { ImageIconProps } from "@/types";
import React from "react";

export default function ImageIcon({ src }: ImageIconProps) {
  return (
    <img
      id="contactPicture"
      className="w-10 h-10 rounded-full border border-[#282828]"
      src={src}
      alt="Profile pic"
    />
  );
}
