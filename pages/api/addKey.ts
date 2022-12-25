import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Senha } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const senha: Senha = req.body;
  try {
    const result = await prisma.senha.create({
      data: {
        ...senha,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while adding a new key." });
  }
}
