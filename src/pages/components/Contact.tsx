import { useState } from "react";
import { deleteContact } from "@/functions";
import { ImageIconProps, NameNumberProps } from "@/types";
import ImageIcon from "./contactComponents/ImageIcon";
import NameNumber from "./contactComponents/NameNumber";
import Dropdown from "./ui/dropdown/Dropdown";
import { AnimatePresence, motion } from "framer-motion";

interface ContactProps extends NameNumberProps, ImageIconProps {
  id: number;
  onDelete: (id: number) => void;
  contact: any;
}

export default function Contact({
  id,
  name,
  phone,
  imageUrl,
  onDelete,
  contact,
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
    <div className="relative flex flex-col custom:flex-row  justify-between w-full h-auto  group">
      <div className="flex flex-row gap-[16px]">
        <ImageIcon
          imageUrl={imageUrl}
          className="w-[2.5rem] h-[2.5rem] rounded-full border border-[#282828]"
        />
        <NameNumber name={name} phone={phone} />
      </div>
      <div className="flex flex-row mobile:flex-row mobile:justify-end gap-[8px] relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ImageIcon
          imageUrl="/icons/Mute.svg"
          className="cursor-pointer mobile:h-[1rem]"
          alt="Mute"
        />
        <ImageIcon
          imageUrl="/icons/Call.svg"
          className="cursor-pointer mobile:h-[1rem]"
          alt="Call"
        />
        <ImageIcon
          imageUrl="/icons/More.svg"
          className="cursor-pointer mobile:h-[1rem]"
          alt="Settings"
          onClick={() => {
            setVisibleDropDown(!visibleDropDown);
          }}
        />
      </div>
      <AnimatePresence>
        {visibleDropDown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full right-[-200px] z-20 bg-G-80 h-[132px] w-[219px] mobile:w-[35px] mobile:right-[-18px] rounded-[8px]"
          >
            <Dropdown
              values={["Edit", "Favourite", "Remove"]}
              onDelete={handleDelete}
              contact={contact}
              setVisibleDropDown={setVisibleDropDown}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
