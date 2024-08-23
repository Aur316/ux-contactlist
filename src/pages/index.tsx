import { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./components/Contact";
import ContactForm from "./components/ui/ContactForm";
import { useStore } from "./context/store";
import Nav from "./components/Nav";
import Loader from "./components/ui/loader/Loader";
import { AnimatePresence, motion } from "framer-motion";

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
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div
      id="contactList"
      className="bg-G-100 text-primary flex flex-col min-h-screen overflow-hidden"
    >
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-start border-r border-l border-disabled w-[766px] mx-auto px-[22px]">
        {loading ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
            <Loader />
          </div>
        ) : contacts ? (
          <AnimatePresence>
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <Contact
                  id={contact.id}
                  name={contact.name}
                  phone={contact.phone}
                  imageUrl={contact.imageUrl || "/image/Default.png"}
                  onDelete={handleDelete}
                  contact={contact}
                  className="flex flex-col items-center justify-center"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p>No contacts found</p>
        )}
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ContactForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
