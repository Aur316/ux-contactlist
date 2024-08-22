import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Contact } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

type Data = {
  message?: string;
  contact?: Contact | null;
  contacts?: Contact[] | null;
  error?: string;
};

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(15).required(),
});

const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, query, body } = req;

  try {
    switch (method) {
      case "GET":
        try {
          const { id } = query;

          if (id) {
            const { error } = idSchema.validate({ id });
            if (error) {
              return res.status(400).json({ error: error.details[0].message });
            }

            const contact = await prisma.contact.findUnique({
              where: { id: Number(id) },
            });

            if (contact) {
              res.status(200).json({ contact });
            } else {
              res.status(404).json({ error: "Contact not found" });
            }
          } else {
            const contacts = await prisma.contact.findMany();
            res.status(200).json({ contacts });
          }
        } catch (error) {
          console.error("Error fetching contact(s):", error);
          res.status(500).json({ error: "Failed to fetch contact(s)" });
        }
        break;

      case "POST":
        try {
          const { error } = contactSchema.validate(body);
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }

          const { name, email, phone } = body;
          const newContact = await prisma.contact.create({
            data: {
              name,
              email,
              phone,
            },
          });
          res.status(201).json({
            message: "Contact added successfully",
            contact: newContact,
          });
        } catch (error) {
          console.error("Error adding contact:", error);
          res.status(500).json({ error: "Failed to add contact" });
        }
        break;

      case "PUT":
        try {
          const { id, name, email, phone } = body;

          const { error: idError } = idSchema.validate({ id });
          if (idError) {
            return res.status(400).json({ error: idError.details[0].message });
          }

          const updateSchema = Joi.object({
            name: contactSchema.extract("name").optional(),
            email: contactSchema.extract("email").optional(),
            phone: contactSchema.extract("phone").optional(),
          });

          const { error } = updateSchema.validate({ name, email, phone });
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }

          const dataToUpdate: Partial<Contact> = {};
          if (name) dataToUpdate.name = name;
          if (email) dataToUpdate.email = email;
          if (phone) dataToUpdate.phone = phone;

          if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({
              error: "At least one field must be provided for update",
            });
          }

          const updatedContact = await prisma.contact.update({
            where: { id },
            data: dataToUpdate,
          });

          res.status(200).json({
            message: "Contact updated successfully",
            contact: updatedContact,
          });
        } catch (error) {
          console.error("Error updating contact:", error);
          res.status(500).json({ error: "Failed to update contact" });
        }
        break;

      case "DELETE":
        try {
          const { id } = body;
          const { error } = idSchema.validate({ id });
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }

          await prisma.contact.delete({
            where: { id },
          });
          res.status(200).json({ message: "Contact deleted successfully" });
        } catch (error) {
          console.error("Error deleting contact:", error);
          res.status(500).json({ error: "Failed to delete contact" });
        }
        break;

      default:
        res.status(405).json({ message: "Method not allowed" });
        break;
    }
  } catch (globalError) {
    console.error("Global error handling API request:", globalError);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
