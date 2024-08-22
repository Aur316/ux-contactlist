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
}

export interface ButtonProps {
  radius?: string;
  color: string;
  background?: string;
  text: "double" | "text" | "icon";
  icon?: string;
  value?: string;
  onClick?: any;
}

export interface DropdownProps {
  values: string[];
  onDelete: () => void;
}
