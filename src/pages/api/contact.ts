import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Contact } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  message?: string;
  contact?: Contact;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { name, email, phone } = req.body as Contact;

    try {
      const newContact = await prisma.contact.create({
        data: {
          name,
          email,
          phone,
        },
      });
      res
        .status(200)
        .json({ message: "Contact added successfully", contact: newContact });
    } catch (error) {
      res.status(500).json({ error: "Failed to add contact" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
