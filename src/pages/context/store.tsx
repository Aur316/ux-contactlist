import { StoreContextType } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const Store = ({ children }: { children: ReactNode }) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <StoreContext.Provider value={{ showForm, setShowForm }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a GlobalStateProvider");
  }
  return context;
};
