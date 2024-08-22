import { useState } from "react";
import { deleteContact } from "@/functions"; // Globális törlési funkció importálása
import { ImageIconProps, NameNumberProps } from "@/types";
import ImageIcon from "./contactComponents/ImageIcon";
import NameNumber from "./contactComponents/NameNumber";
import Dropdown from "./ui/dropdown/Dropdown";

interface ContactProps extends NameNumberProps, ImageIconProps {
  id: number; // A kontakt azonosítója a törléshez
  onDelete: (id: number) => void; // Callback a sikeres törlés után
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
      await deleteContact(id); // Törlési funkció meghívása
      onDelete(id); // Callback meghívása a szülő komponensben
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
          onDelete={handleDelete} // Törlési funkció átadása a Dropdown komponensnek
        />
      )}
    </div>
  );
}
