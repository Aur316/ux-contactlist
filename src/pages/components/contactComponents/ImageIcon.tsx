import { ImageIconProps } from "@/types";
import React from "react";

export default function ImageIcon({
  imageUrl,
  className,
  alt,
  onClick,
  parentSize,
}: ImageIconProps) {
  return (
    <div
      className={`flex  ${parentSize} items-center justify-center cursor-pointer`}
    >
      <img
        id="contactPicture"
        className={` ${className}`}
        src={imageUrl}
        alt={alt}
        onClick={onClick}
      />
    </div>
  );
}
