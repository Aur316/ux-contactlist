export type ContactType = {
  id: number;
  name: string;
  email: string;
  phone: number;
  imageUrl: string;
};

export interface NameNumberProps {
  name: string;
  phone: number;
}

export interface ImageIconProps {
  imageUrl: string;
  className?: string;
  alt?: string;
  onClick?: any;
}

export interface ButtonProps {
  radius?: string;
  color?: string;
  background?: string;
  text: "double" | "text" | "icon";
  icon?: string;
  value?: string;
  onClick?: any;
  className?: string;
}

export interface DropdownProps {
  values: string[];
  onDelete: () => void;
  className?: string;
  contact: any;
  setVisibleDropDown: any;
}

export interface StoreContextType {
  showForm: boolean;
  setShowForm: (value: boolean) => void;
  contacts: ContactType[] | null;
  setContacts: React.Dispatch<React.SetStateAction<ContactType[] | null>>;
  editingContact: any;
  setEditingContact: any;
}
