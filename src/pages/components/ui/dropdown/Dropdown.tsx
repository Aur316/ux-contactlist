import { DropdownProps } from "@/types";
import { useStore } from "@/pages/context/store"; // Hozzáadjuk a Store-t

export default function Dropdown({
  values,
  onDelete,
  className,
  contact,
  setVisibleDropDown,
}: DropdownProps) {
  const { setShowForm, setEditingContact } = useStore();

  return (
    <div className={className}>
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
            <img src={`/icons/${value}.png`} alt={value} />
            <p>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
