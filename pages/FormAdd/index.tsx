import { useState } from "react";
import { ISenha } from "../../types/types";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { style } from "./styles";
import { LockOpen } from "@mui/icons-material";
import api from "../../services/api";
import { AxiosError } from "axios";

type ISenhaPost = Omit<ISenha, "id">;

type IFormAddProps = {
  openForm: boolean;
  onCloseFormAdd: () => void;
};

export const FormAdd = ({ onCloseFormAdd, openForm }: IFormAddProps) => {
  const [valor, setValor] = useState<string>("");
  const [chave, setChave] = useState<string>("");
  const [ambiente, setAmbiente] = useState<string>("");
  const [exibir, setExibir] = useState<boolean>(false);

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
    onCloseFormAdd();
  }

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
              Exibir senha {""}
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
};
