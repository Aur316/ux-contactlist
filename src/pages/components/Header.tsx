import { useStore } from "../context/store";
import ImageIcon from "./contactComponents/ImageIcon";
import Button from "./ui/button/Button";

export default function Header() {
  const { setShowForm } = useStore();
  return (
    <div className="flex flex-row justify-between">
      <h1 className="font-medium text-[32px] leading-[48px] font-glysa text-primary">
        Contacts
      </h1>
      <div className="flex flex-row gap-[24px] items-center ">
        <Button
          text="icon"
          icon="/icons/Edit.png"
          className="w-[24px] h-[24px] rounded-[8px] bg-G-60"
        />
        <ImageIcon
          imageUrl={"/icons/Profile.png"}
          className="w-[24px] h-[24px] "
        />
        <Button
          text="double"
          className="w-[120px] h-[40px] rounded-[1000px] border border-[1px] border-[#3C3C3C] bg-gradient-to-b from-[#282828] to-[#282828] px-[12px] py-[8px] gap-[8px]"
          value={"Add New"}
          icon={"/icons/Add.png"}
          onClick={() => {
            setShowForm(true);
          }}
        />
      </div>
    </div>
  );
}
