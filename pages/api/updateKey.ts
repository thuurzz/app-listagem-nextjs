import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Senha } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, newValue } = req.body;
  try {
    const response = await prisma.senha.update({
      where: {
        id,
      },
      data: {
        valor: newValue,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(403).json({ err: "Error occured while update a  item." });
  }
}
