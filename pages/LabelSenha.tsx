import { LockOpen, Edit, Delete, Check, Cancel } from "@mui/icons-material";
import { Input, Button } from "@mui/material";
import { useState } from "react";
import { ISenha } from "../types/types";
import api from "../services/api";
import { AxiosError } from "axios";

type ILabelSenha = {
  senha: ISenha;
  updateList: () => void;
};

export default function LabelSenha({ senha, updateList }: ILabelSenha) {
  const [exibir, setExibir] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState("");

  const updateValueKey = async (id: string, newValue: string) => {
    try {
      const resp = await api.put("/api/updateKey", {
        id: id,
        newValue: newValue,
      });
      if (resp.status === 200) {
        // criar alert toast para sucesso
        setIsEditing(false);
        setNewValue("");
      }
      console.log(resp);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      // chamar função para atualizar a home
      updateList();
    }
  };

  const deleteKey = async (id: string) => {
    try {
      const resp = await api.post("/api/deleteKey", { id: id });
      if (resp.status === 200) {
        // criar alert toast para sucesso
        setIsEditing(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      // chamar função para atualizar a home
      updateList();
    }
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
            : senha.ambiente !== "prd"
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
              deleteKey(senha.id);
            }}
          >
            <Delete />
          </Button>
        </>
      )}
    </>
  );
}
