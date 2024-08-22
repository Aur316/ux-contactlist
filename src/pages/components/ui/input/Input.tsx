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
  type = "text",
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-secondary text-xs">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-G-80 text-primary border-none rounded-lg p-2 text-sm leading-tight placeholder-secondary focus:outline-none"
      />
    </div>
  );
}
