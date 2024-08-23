import { ImageIconProps } from "@/types";
import React from "react";

export default function ImageIcon({
  imageUrl,
  className,
  alt,
  onClick,
}: ImageIconProps) {
  return (
    <img
      id="contactPicture"
      className={` ${className}`}
      src={imageUrl}
      alt={alt}
      onClick={onClick}
    />
  );
}
