import React, { useRef, useState } from "react";
import Input from "./input/Input";
import Button from "./button/Button";
import axios from "axios";
import ImageIcon from "../contactComponents/ImageIcon";
import { useStore } from "@/pages/context/store";

export default function AddContactForm() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { setShowForm } = useStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const addNewContact = async () => {
    try {
      let uploadedImageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await axios.post("/api/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        uploadedImageUrl = response.data.url;
      }

      await axios.post("/api/contact", {
        name,
        phone,
        email,
        imageUrl: uploadedImageUrl,
      });

      setName("");
      setPhone("");
      setEmail("");
      setImageFile(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const ImageSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-G-100 rounded-lg p-6 w-[364px] h-[540px] p-[48px]">
      <div className="w-[316px] h-[404px] flex flex-col gap-6">
        <div>
          <h2 className="text-primary text-[24px] mb-4 font-glysa font-medium leading-[40px]">
            Add contact
          </h2>

          <div className="flex items-center flex flex-row gap-3">
            <ImageIcon
              imageUrl={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : "/image/Default.png"
              }
              className="w-16 h-16  rounded-full border border-[#282828]"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />

            <Button
              text="double"
              className={`rounded-[8px] text-primary bg-G-60 pt-[8px] pr-[16px] pb-[8px] pl-[12px] ${
                imageFile ? "w-[164px]" : "w-[139px]"
              }`}
              value={imageFile ? "Change Picture" : "Add Picture"}
              icon={imageFile ? "/icons/Change.png" : "/icons/Add.png"}
              onClick={ImageSelect}
            />
            {imageFile && (
              <Button
                text="icon"
                icon="/icons/Remove.png"
                className="w-[40px] h-[40px] rounded-[8px] bg-G-60"
                onClick={() => {
                  setImageFile(null);
                }}
              />
            )}
          </div>
        </div>
        <Input
          label="Name"
          placeholder="Jamie Wright"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type={"text"}
        />
        <Input
          label="Phone number"
          placeholder="+01 234 5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type={"text"}
        />
        <Input
          label="Email address"
          placeholder="jamie.wright@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type={"text"}
        />
      </div>
      <div className="flex justify-end mt-6 ">
        <Button
          className="text-primary font-lexend w-[78px]"
          text="text"
          value="Cancel"
          onClick={() => {
            setShowForm(false);
          }}
        />
        <Button
          className="rounded-[8px] text-primary bg-G-60 font-lexend w-[68px] pt-[8px] pr-[16px] pb-[8px] pl-[16px]"
          text="text"
          value="Done"
          onClick={addNewContact}
        />
      </div>
    </div>
  );
}
