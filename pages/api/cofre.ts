// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type ISenha = {
  id: string;
  chave: string;
  valor: string;
  ambiente: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISenha[]>
) {
  res.status(200).json([
    {
      id: "6cb0ad51-b97a-4930-ad89-091b67b5cd82",
      chave: "postgres",
      valor: "senhadb",
      ambiente: "dev",
    },
    {
      id: "765c7ab9-28fc-44ae-b43e-6459c3df6da4",
      chave: "postgres",
      valor: "senhadb",
      ambiente: "hml",
    },
    {
      id: "74dc73c6-be86-416a-ac49-f245a7732c5d",
      chave: "postgres",
      valor: "null",
      ambiente: "prd",
    },
  ]);
}
