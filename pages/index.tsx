import { useEffect, useState } from "react";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import api from "../services/api";
import { AxiosError } from "axios";
import { LabelSenha } from "./LabelSenha";

export type ISenha = {
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

  return (
    <>
      <TableContainer
        component={Paper}
        variant="elevation"
        sx={{ m: 1, width: "auto" }}
      >
        <Typography
          textAlign={"left"}
          variant="h3"
          sx={{ m: "1rem", color: "#1976d2" }}
        >
          🔒 Listagem de Segredos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"30%"}>UUID</TableCell>
              <TableCell width={"20%"}>CHAVE</TableCell>
              <TableCell width={"30%"}>VALOR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {senhas.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.chave}</TableCell>
                <TableCell>
                  <LabelSenha senha={row} />
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
