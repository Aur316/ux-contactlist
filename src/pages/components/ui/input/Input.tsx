import React from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function InputField({
  label,
  placeholder,
  value,
  onChange,
  type,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-secondary text-xs">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-G-80 h-[40px] w-[268px] pt-[8px] pr-[16px] pb-[8px] pl-[12px] text-primary border border-G-60 rounded-lg p-2 text-sm leading-tight focus:outline-none placeholder:text-disabled placeholder:font-lexend placeholder:leading-[17.5px] placeholder:text-[14px] placeholder:font-normal"
      />
    </div>
  );
}
