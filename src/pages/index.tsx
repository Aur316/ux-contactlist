import { useEffect, useState } from "react";
import axios from "axios";
import { ContactType } from "@/types";
import Contact from "./component/Contact";

export default function Home() {
  const [contacts, setContacts] = useState<ContactType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getContacts = async () => {
      try {
        const response = await axios.get("/api/contact");
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

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-G-100 text-primary p-4 flex flex-col gap-2">
      {contacts ? (
        contacts.map((contact) => (
          <Contact
            key={contact.id}
            name={contact.name}
            phone={contact.phone}
            src="/image/Default.png"
          />
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
}
