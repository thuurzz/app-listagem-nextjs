import { useState } from "react";
import { ISenha } from "../types/types";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import api from "../services/api";
import { AxiosError } from "axios";

type ISenhaPost = Omit<ISenha, "id">;

type IFormAddProps = {
  openForm: boolean;
  onCloseFormAdd: () => void;
};

export default function FormAdd({ onCloseFormAdd, openForm }: IFormAddProps) {
  const [valor, setValor] = useState<string>("");
  const [chave, setChave] = useState<string>("");
  const [ambiente, setAmbiente] = useState<string>("");
  const [exibir, setExibir] = useState<boolean>(true);

  const handleSubmit = async () => {
    if (!valor || !chave || !ambiente) {
      return;
    }

    const segredo: ISenhaPost = {
      ambiente: ambiente,
      chave: chave,
      valor: valor,
    };
    try {
      const resp = await api.post("/api/addKey", segredo);
      if (resp.status === 200) {
        // criar alert toast para sucesso
        handleClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      // chamar função para atualizar a home
    }
  };

  function handleClose(): void {
    setAmbiente("");
    setChave("");
    setValor("");
    setExibir(true);
    onCloseFormAdd();
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "0.5rem",
  };

  return (
    <>
      <Modal open={openForm} onClose={handleClose}>
        <Box sx={style}>
          <FormGroup>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Cadastro de senha 🔑
            </Typography>
            <Typography variant="overline" sx={{ mb: "1rem" }}>
              Armazenar no cofre de senhas
            </Typography>
            <FormLabel component="legend">Chave</FormLabel>
            <Input
              id="chave"
              value={chave}
              onChange={(e) => {
                setChave(e.target.value);
              }}
              fullWidth
              sx={{ mb: "1rem" }}
            />
            <FormLabel component="legend">Valor</FormLabel>
            <Input
              id="valor"
              value={valor}
              onChange={(e) => {
                setValor(e.target.value);
              }}
              fullWidth
              sx={{ mb: "1rem" }}
              type={exibir ? "text" : "password"}
            />
            <Button
              onClick={() => {
                setExibir(!exibir);
              }}
            >
              esconder/exibir senha {""}
              <LockOpen />
            </Button>
            <Box sx={{ mb: "2rem" }}>
              <FormLabel component="legend">Ambiente</FormLabel>
              <RadioGroup row onChange={(e) => setAmbiente(e.target.value)}>
                <FormControlLabel value="dev" control={<Radio />} label="dev" />
                <FormControlLabel value="hml" control={<Radio />} label="hml" />
                <FormControlLabel value="prd" control={<Radio />} label="prd" />
              </RadioGroup>
            </Box>
            <Button variant="contained" onClick={handleSubmit}>
              Enviar
            </Button>
          </FormGroup>
        </Box>
      </Modal>
    </>
  );
}
