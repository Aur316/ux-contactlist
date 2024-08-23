import { ImageIconProps } from "@/types";
import React from "react";

export default function ImageIcon({ imageUrl, className }: ImageIconProps) {
  return (
    <img
      id="contactPicture"
      className={` rounded-full border border-[#282828] ${className}`}
      src={imageUrl}
      alt="Profile pic"
    />
  );
}
