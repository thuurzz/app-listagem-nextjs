import { LockOpen, Edit, Delete, Check, Cancel } from "@mui/icons-material";
import {
  Input,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
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
  const [dialogDelete, setDialogDelete] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [textDialog, setTextDialog] = useState("");

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
        handleClose();
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
        handleClose();
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

  const handleClose = () => {
    setDialogDelete(false);
    setDialogEdit(false);
    setTextDialog("");
  };

  return (
    <>
      <Input
        type={isEditing ? "text" : exibir ? "text" : "password"}
        value={isEditing ? newValue : exibir ? senha.valor : "***************"}
        onChange={(e) => setNewValue(e.target.value)}
        disabled={!isEditing}
      />
      {isEditing ? (
        <>
          <Button
            onClick={() => {
              setDialogEdit(true);
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
              setDialogDelete(true);
            }}
          >
            <Delete />
          </Button>
        </>
      )}

      {/* Caixa de diálogo para delete */}
      <Dialog open={dialogDelete} onClose={handleClose}>
        <DialogTitle>⚠️ Confirmar ação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja realizar essa ação ? <br />
            Caso tenha certeza, digite: {senha.chave}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="textDialog"
            label="nome do objeto"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTextDialog(e.target.value)}
            value={textDialog}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={textDialog !== senha.chave}
            onClick={() => deleteKey(senha.id)}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Caixa de diálogo para edit */}
      <Dialog open={dialogEdit} onClose={handleClose}>
        <DialogTitle>⚠️ Confirmar ação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja realizar essa ação ? <br />
            Caso tenha certeza, digite: {senha.chave}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="textDialog"
            label="nome do objeto"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTextDialog(e.target.value)}
            value={textDialog}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={textDialog !== senha.chave}
            onClick={() => updateValueKey(senha.id, newValue)}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
