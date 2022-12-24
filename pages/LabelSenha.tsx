import { LockOpen, Edit, Delete } from "@mui/icons-material";
import { Input, Button } from "@mui/material";
import { useState } from "react";
import { ISenha } from ".";

type ILabelSenha = {
  senha: ISenha;
};

export const LabelSenha = ({ senha }: ILabelSenha) => {
  const [exibir, setExibir] = useState(false);

  return (
    <>
      <Input
        type={exibir ? "text" : "password"}
        value={senha.valor !== "null" ? senha.valor : "Não permitido"}
      />
      <Button
        disabled={senha.valor === "null" ? true : false}
        onClick={() => {
          setExibir(!exibir);
          console.log(senha.valor);
        }}
      >
        <LockOpen />
      </Button>
      <Button
        onClick={() => {
          console.log(`Editando senha: ${senha.id}`);
        }}
      >
        <Edit />
      </Button>
      <Button
        sx={{ ml: "0.25rem" }}
        onClick={() => {
          console.log(`Deletando senha: ${senha.id}`);
        }}
      >
        <Delete />
      </Button>
    </>
  );
};
