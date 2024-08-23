import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Contact } from "@prisma/client";
import Joi from "joi";
import { LRUCache } from "lru-cache";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const s3 = new AWS.S3();

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
  imageUrl: Joi.string().uri().optional().allow(null, ""),
});

const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const rateLimiter = new LRUCache<string, number>({
  max: 100,
  ttl: 60 * 1000,
});

async function uploadImageToS3(file: Buffer, fileName: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: file,
    ACL: "public-read",
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!ip) {
    return res.status(400).json({ error: "Unable to determine IP address" });
  }

  const requestCount = rateLimiter.get(ip as string) || 0;

  if (requestCount >= 10) {
    return res
      .status(429)
      .json({ error: "Too many requests, please try again later." });
  }

  rateLimiter.set(ip as string, requestCount + 1);

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
          const { name, email, phone, imageUrl } = body;

          const { error } = contactSchema.validate({
            name,
            email,
            phone,
            imageUrl,
          });
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }

          const newContact = await prisma.contact.create({
            data: {
              name,
              email,
              phone,
              imageUrl,
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
          const { id } = req.query;
          const { name, email, phone, imageUrl } = body;

          const { error: idError } = idSchema.validate({ id });
          if (idError) {
            return res.status(400).json({ error: idError.details[0].message });
          }

          const updateSchema = Joi.object({
            name: contactSchema.extract("name").optional(),
            email: contactSchema.extract("email").optional(),
            phone: contactSchema.extract("phone").optional(),
            imageUrl: contactSchema.extract("imageUrl").optional(),
          });

          const { error } = updateSchema.validate({
            name,
            email,
            phone,
            imageUrl,
          });
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }

          const dataToUpdate: Partial<Contact> = {};
          if (name) dataToUpdate.name = name;
          if (email) dataToUpdate.email = email;
          if (phone) dataToUpdate.phone = phone;
          if (imageUrl) dataToUpdate.imageUrl = imageUrl;

          if (body.imageFile) {
            const buffer = Buffer.from(body.imageFile, "base64");
            const fileName = `images/${uuidv4()}.png`;
            dataToUpdate.imageUrl = await uploadImageToS3(buffer, fileName);
          }

          const updatedContact = await prisma.contact.update({
            where: { id: Number(id) },
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
          const { id } = query;
          const { error } = idSchema.validate({ id: Number(id) });
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }

          await prisma.contact.delete({
            where: { id: Number(id) },
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
