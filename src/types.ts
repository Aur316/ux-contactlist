export type ContactType = {
  id: number;
  name: string;
  email: string;
  phone: number;
  img: string;
};

export interface NameNumberProps {
  name: string;
  phone: number;
}

export interface ImageIconProps {
  src: string;
}

export interface ButtonProps {
  radius: string;
  color: string;
  background: string;
  text: "double" | "text" | "icon";
  icon?: string;
  value?: string;
}
