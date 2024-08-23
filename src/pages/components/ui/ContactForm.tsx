import React, { useRef, useState, useEffect } from "react";
import Input from "./input/Input";
import Button from "./button/Button";
import axios from "axios";
import ImageIcon from "../contactComponents/ImageIcon";
import { useStore } from "@/context/store";
import Loader from "./loader/Loader";

export default function AddContactForm() {
  const { setShowForm, setEditingContact, setContacts, editingContact } =
    useStore();
  const [name, setName] = useState<string>(editingContact?.name || "");
  const [phone, setPhone] = useState<string>(editingContact?.phone || "");
  const [email, setEmail] = useState<string>(editingContact?.email || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(
    editingContact?.imageUrl || ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
      setEmail(editingContact.email);
      setUploadedImageUrl(editingContact.imageUrl || "");
    }
  }, [editingContact]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setImageFile(null);
    setUploadedImageUrl("");
  };

  const addNewContact = async () => {
    setLoading(true);
    setError(null);

    try {
      let newImageUrl = uploadedImageUrl;

      // If there's an image file, upload it
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await axios.post("/api/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        newImageUrl = response.data.url;
      }

      if (editingContact) {
        // Update existing contact
        const updatedContactResponse = await axios.put(
          `/api/contact?id=${editingContact.id}`,
          {
            name,
            phone,
            email,
            imageUrl: newImageUrl,
          }
        );

        setContacts((prevContacts) =>
          (prevContacts || []).map((contact) =>
            contact.id === editingContact.id
              ? updatedContactResponse.data.contact
              : contact
          )
        );
      } else {
        // Create a new contact
        const newContactResponse = await axios.post("/api/contact", {
          name,
          phone,
          email,
          imageUrl: newImageUrl,
        });

        setContacts((prevContacts) => [
          ...(prevContacts || []),
          newContactResponse.data.contact,
        ]);
      }

      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding contact:", error);
      setError("Failed to save contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ImageSelect = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-G-100 rounded-lg p-[24px] w-[364px] h-[540px] p-[48px]">
      <div className="w-[316px] h-[404px] flex flex-col gap-6">
        <div>
          <h2 className="text-primary text-[24px] mb-4 font-glysa font-medium leading-[40px]">
            {editingContact ? "Edit Contact" : "Add Contact"}
          </h2>

          <div className="flex items-center flex flex-row gap-3 w-[316px] h-[88px]">
            <ImageIcon
              imageUrl={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : uploadedImageUrl || "/image/Default.png"
              }
              className="w-[88px] h-[88px] rounded-full border border-[#282828]"
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
              className={`rounded-[8px] text-primary bg-G-60 pt-[8px] pr-[16px] pb-[8px] pl-[12px]  ${
                imageFile || editingContact ? "w-[164px]" : "w-[139px]"
              }`}
              value={
                imageFile || editingContact ? "Change Picture" : "Add Picture"
              }
              icon={
                imageFile || editingContact
                  ? "/icons/Change.svg"
                  : "/icons/Add.svg"
              }
              onClick={ImageSelect}
            />
            {(imageFile || editingContact) && (
              <Button
                text="icon"
                icon="/icons/Remove.svg"
                className="w-[40px] h-[40px] rounded-[8px] bg-G-60"
                onClick={() => {
                  if (editingContact) {
                    setUploadedImageUrl("");
                  }
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
      <div className="flex justify-end  gap-2">
        <Button
          className="text-primary font-lexend w-[78px] rounded-[8px]"
          text="text"
          value="Cancel"
          onClick={() => {
            setEditingContact(null);
            setShowForm(false);
          }}
        />
        <Button
          className={`rounded-[8px] text-primary bg-G-60 font-lexend w-[68px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] ${
            !name || !phone || !email || phone.length < 7 || name.length < 3
              ? "cursor-not-allowed"
              : ""
          }`}
          text="text"
          value="Done"
          onClick={addNewContact}
          disabled={!name || !phone || !email}
        />
      </div>
    </div>
  );
}
