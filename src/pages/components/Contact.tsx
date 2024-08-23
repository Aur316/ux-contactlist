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
  imageUrl,
  onDelete,
}: ContactProps) {
  const [visibleDropDown, setVisibleDropDown] = useState<boolean>(false);
  const handleDelete = async () => {
    try {
      console.log(id, "!!!!!!");
      await deleteContact(id);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="relative flex flex-row justify-between w-[720px] h-[64px] items-center">
      <div className="flex flex-row gap-[16px]">
        <ImageIcon
          imageUrl={imageUrl}
          className="w-10 h-10  rounded-full border border-[#282828]"
        />
        <NameNumber name={name} phone={phone} />
      </div>
      <div className="flex flex-row gap-[8px] relative">
        <ImageIcon
          imageUrl="/icons/Mute.png"
          className="cursor-pointer "
          alt="Mute"
        />
        <ImageIcon
          imageUrl="/icons/Call.png"
          className="cursor-pointer "
          alt="Call"
        />
        <ImageIcon
          imageUrl="/icons/More.png"
          className="cursor-pointer "
          alt="Settings"
          onClick={() => {
            setVisibleDropDown(!visibleDropDown);
          }}
        />
      </div>
      {visibleDropDown && (
        <Dropdown
          values={["Edit", "Favourite", "Remove"]}
          onDelete={handleDelete}
          className="absolute top-full right-[-200px] z-20 bg-G-80 h-[132px] w-[219px] rounded-[8px]"
        />
      )}
    </div>
  );
}
