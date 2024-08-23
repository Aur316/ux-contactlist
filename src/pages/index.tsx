import { useEffect, useState } from "react";
import axios from "axios";
import { ContactType } from "@/types";
import Contact from "./components/Contact";
import Button from "./components/ui/button/Button";
import ContactForm from "./components/ui/ContactForm";

export default function Home() {
  const [contacts, setContacts] = useState<ContactType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getContacts = async () => {
      try {
        const response = await axios.get("/api/contact");
        console.log(response, "res");
        setContacts(response.data.contacts || []);
        setLoading(false);
      } catch (error) {
        setError("Error fetching contacts");
        setLoading(false);
        console.error("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, []);

  const handleDelete = (id: number) => {
    setContacts((prevContacts) =>
      prevContacts ? prevContacts.filter((contact) => contact.id !== id) : null
    );
  };

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      id="contactList"
      className="bg-G-100 text-primary p-4 flex flex-col gap-2"
    >
      {contacts ? (
        contacts.map((contact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            imageUrl={contact.imageUrl || "/image/Default.png"}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No contacts found</p>
      )}
      {/* <Button
        radius="rounded-[15px]"
        color="text-secondary"
        background="bg-amber-400"
        text="double"
        icon="/icons/Add.png"
        value="Add new"
      />

      <Button
        radius=""
        color=""
        background="bg-amber-400"
        text="icon"
        icon="/icons/Add.png"
      /> */}
      <ContactForm />
    </div>
  );
}
