import { ImageIconProps, NameNumberProps } from "@/types";
import ImageIcon from "./contactComponents/ImageIcon";
import NameNumber from "./contactComponents/NameNumber";

interface ContactProps extends NameNumberProps, ImageIconProps {}

export default function Contact({ name, phone, src }: ContactProps) {
  return (
    <div className="flex flex-row gap-1">
      <ImageIcon src={src} />
      <NameNumber name={name} phone={phone} />
    </div>
  );
}
