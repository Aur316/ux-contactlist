import { useEffect, useRef } from "react";
import { DropdownProps } from "@/types";
import { useStore } from "@/pages/context/store";

export default function Dropdown({
  values,
  onDelete,
  className,
  contact,
  setVisibleDropDown,
}: DropdownProps) {
  const { setShowForm, setEditingContact } = useStore();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisibleDropDown(false);
      }
    };

    document.addEventListener("mousedown", ClickOutside);
    return () => {
      document.removeEventListener("mousedown", ClickOutside);
    };
  }, [setVisibleDropDown]);

  return (
    <div ref={dropdownRef} className={className}>
      {values.map((value, index) => (
        <div
          key={value}
          onClick={() => {
            if (value === "Remove") {
              onDelete();
            } else if (value === "Edit") {
              setEditingContact(contact);
              setShowForm(true);
            }
            setVisibleDropDown(false);
          }}
          className={`hover:bg-G-70 hover:cursor-pointer ${
            index === 0 ? "rounded-t-lg" : ""
          } ${index === values.length - 1 ? "rounded-b-lg" : ""}`}
        >
          <div className="flex flex-row gap-[12px] h-[44px] items-center pt-[12px] pr-[10px] pb-[12px] pl-[10px]">
            <img src={`/icons/${value}.svg`} alt={value} />
            <p>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
