import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  try {
    const response = await prisma.senha.delete({
      where: {
        id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(403).json({ err: "Error occured while deleting a  item." });
  }
}
