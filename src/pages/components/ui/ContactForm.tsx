import React, { useState } from "react";
import Input from "./input/Input";
import Button from "./button/Button";

export default function AddContactForm() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <div className="bg-G-90 rounded-lg p-6 w-[350px]">
      <h2 className="text-primary text-xl mb-4 font-lexend">Add contact</h2>

      <div className="flex items-center mb-4">
        <img
          src="/path/to/profile-pic.png"
          alt="Profile"
          className="w-16 h-16 rounded-full border border-G-80 mr-4"
        />
        <Button
          radius="rounded-[8px]"
          color="text-primary"
          background="bg-G-60"
          text="double"
          icon="/icons/Add.png"
          value="Add picture"
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
        />
      </div>
    </div>
  );
}
