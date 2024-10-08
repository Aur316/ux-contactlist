import React from "react";
import ImageIcon from "./contactComponents/ImageIcon";
import Header from "./Header";

export default function Nav() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between border-disabled">
        <div className="flex flex-row items-center ml-auto h-[92px] border-r border-disabled pr-[22px] w-[20%] "></div>
        <div className="flex flex-row justify-between items-center h-[48px] m-[22px] w-[60%] max-w-[720px]"></div>
        <div className="flex flex-row items-center h-[92px] mr-auto border-l border-disabled pl-[22px] w-[20%] "></div>
      </div>
      <div className="flex flex-row items-center justify-between border-t border-b border-disabled">
        <div className="flex flex-row items-center justify-end ml-auto h-[92px] border-r border-disabled pr-[22px] w-[20%]">
          <ImageIcon
            imageUrl="/icons/Back.svg"
            className="w-[24px] h-[24px] cursor-pointer"
          />
        </div>
        <Header />
        <div className="flex flex-row items-center h-[92px] mr-auto border-l border-disabled pl-[22px] w-[20%]">
          <ImageIcon
            imageUrl="/icons/Light.svg"
            className="w-[24px] h-[24px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
