import { LockOpen, Edit, Delete, Check, Cancel } from "@mui/icons-material";
import { Input, Button } from "@mui/material";
import { useState } from "react";
import { ISenha } from "../types/types";

type ILabelSenha = {
  senha: ISenha;
};

export const LabelSenha = ({ senha }: ILabelSenha) => {
  const [exibir, setExibir] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState("");

  const updateValueKey = (id: string, newValue: string) => {
    console.log(`Alterando valor da chave: ${id} para: ${newValue}`);
    setIsEditing(false);
    setNewValue("");
  };

  const cancelAction = () => {
    console.log("Operação cancelada");
    setIsEditing(false);
    setNewValue("");
  };

  return (
    <>
      <Input
        type={isEditing ? "text" : exibir ? "text" : "password"}
        value={
          isEditing
            ? newValue
            : senha.valor !== "null"
            ? senha.valor
            : "Não permitido"
        }
        onChange={(e) => setNewValue(e.target.value)}
        disabled={!isEditing}
      />
      {isEditing ? (
        <>
          <Button
            onClick={() => {
              updateValueKey(senha.id, newValue);
            }}
          >
            <Check />
          </Button>
          <Button
            onClick={() => {
              cancelAction();
            }}
          >
            <Cancel />
          </Button>
        </>
      ) : (
        <>
          <Button
            disabled={senha.valor === "null" ? true : false}
            onClick={() => {
              setExibir(!exibir);
            }}
          >
            <LockOpen />
          </Button>
          <Button
            onClick={() => {
              console.log(`Editando senha: ${senha.id}`);
              setIsEditing(true);
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
      )}
    </>
  );
};
