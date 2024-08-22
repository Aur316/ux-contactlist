import React, { useState } from "react";
import Input from "./input/Input";
import Button from "./button/Button";
import axios from "axios";

export default function AddContactForm() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async () => {
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
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div className="bg-G-90 rounded-lg p-6 w-[350px]">
      <h2 className="text-primary text-xl mb-4 font-lexend">Add contact</h2>

      <div className="flex items-center mb-4">
        <img
          src={imageFile ? URL.createObjectURL(imageFile) : ""}
          alt="Profile"
          className="w-16 h-16 rounded-full border border-G-80 mr-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
        />
      </div>

      <Input
        label="Name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Phone number"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        label="Email address"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="flex justify-between mt-6">
        <Button color="text-primary" text="text" value="Cancel" />
        <Button
          radius="rounded-[8px]"
          color="text-primary"
          background="bg-G-60"
          text="text"
          value="Done"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
