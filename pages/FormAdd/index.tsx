import { useState } from "react";
import { ISenha } from "../../types/types";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { style } from "./styles";

type ISenhaPost = Omit<ISenha, "id">;

type IFormAddProps = {
  openForm: boolean;
  onCloseFormAdd: () => void;
};

export const FormAdd = ({ onCloseFormAdd, openForm }: IFormAddProps) => {
  const [valor, setValor] = useState<string>("");
  const [chave, setChave] = useState<string>("");
  const [ambiente, setAmbiente] = useState<string>("");

  const handleSubmit = () => {
    if (!valor || !chave || !ambiente) {
      return;
    }

    const segredo: ISenhaPost = {
      ambiente: ambiente,
      chave: chave,
      valor: valor,
    };

    console.log(segredo);
  };

  function handleClose(): void {
    setAmbiente("");
    setChave("");
    setValor("");
    onCloseFormAdd();
  }

  return (
    <>
      <Modal
        open={openForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
