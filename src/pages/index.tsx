import { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./components/Contact";
import ContactForm from "./components/ui/ContactForm";
import Header from "./components/Header";
import { useStore } from "./context/store";
import Nav from "./components/Nav";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showForm, contacts, setContacts } = useStore();

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

  const handleDelete = (id: number) => {
    if (contacts) {
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);
    }
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
      className="bg-G-100 text-primary p-4 flex flex-col  min-h-screen"
    >
      <Nav />
      <div
        className="
        border-r border-l border-disabled 
        w-[766px] h-screen 
        mx-auto 
        px-[22px]
      "
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
              contact={contact}
            />
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <ContactForm />
        </div>
      )}
    </div>
  );
}
