import { useEffect, useState } from "react";
import {
  Button,
  Input,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import api from "../services/api";
import { AxiosError } from "axios";
import { LockOpen } from "@mui/icons-material";

type ISenha = {
  id: string;
  chave: string;
  valor: string;
  ambiente: string;
};

export default function Home() {
  const [senhas, setSenhas] = useState<ISenha[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleBuscaSenhas();
  }, []);

  const handleBuscaSenhas = async () => {
    setIsLoading(true);
    try {
      const resp = await api.get("/api/cofre");
      const senhas: ISenha[] = await resp.data;
      setSenhas(senhas);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const rows = senhas.map((segredo) => {
    return {
      id: segredo.id,
      chave: segredo.chave,
      valor: segredo.valor,
    };
  });

  type ILabelSenha = {
    senha: string;
  };

  const LabelSenha = ({ senha }: ILabelSenha) => {
    const [exibir, setExibir] = useState(false);

    return (
      <>
        <Input
          type={exibir ? "text" : "password"}
          value={senha !== "null" ? senha : "Não pode ser exibido"}
        />
        <Button sx={{ ml: "0.5rem" }}>
          <LockOpen
            onClick={() => {
              setExibir(!exibir);
            }}
          />
        </Button>
      </>
    );
  };

  return (
    <>
      <TableContainer
        component={Paper}
        variant="elevation"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UUID</TableCell>
              <TableCell>CHAVE</TableCell>
              <TableCell>VALOR</TableCell>
              <TableCell>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.chave}</TableCell>
                <TableCell>
                  <LabelSenha senha={row.valor} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
