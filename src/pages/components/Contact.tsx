import { useState } from "react";
import { deleteContact } from "@/functions";
import { ImageIconProps, NameNumberProps } from "@/types";
import ImageIcon from "./contactComponents/ImageIcon";
import NameNumber from "./contactComponents/NameNumber";
import Dropdown from "./ui/dropdown/Dropdown";

interface ContactProps extends NameNumberProps, ImageIconProps {
  id: number;
  onDelete: (id: number) => void;
}

export default function Contact({
  id,
  name,
  phone,
  src,
  onDelete,
}: ContactProps) {
  const [visibleDropDown, setVisibleDropDown] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await deleteContact(id);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="relative flex flex-row gap-1">
      <ImageIcon src={src} />
      <NameNumber name={name} phone={phone} />
      <img
        src="/icons/More.png"
        alt="Settings"
        className="cursor-pointer"
        onClick={() => {
          setVisibleDropDown(!visibleDropDown);
        }}
      />
      {visibleDropDown && (
        <Dropdown
          values={["Edit", "Favourite", "Remove"]}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
