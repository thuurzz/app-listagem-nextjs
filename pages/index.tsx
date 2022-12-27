import { useEffect, useState } from "react";
import {
  Button,
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
import { ISenha } from "../types/types";
import { Add } from "@mui/icons-material";
import FormAdd from "./formAdd";
import LabelSenha from "./labelSenha";


export default function Home() {
  const [senhas, setSenhas] = useState<ISenha[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openFormAdd, setOpenFormAdd] = useState<boolean>(false);

  useEffect(() => {
    handleBuscaSenhas();
  }, [openFormAdd]);

  const handleBuscaSenhas = async () => {
    setIsLoading(true);
    try {
      const resp = await api.get("/api/getKey");
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

  const onCloseFormAdd = () => {
    setOpenFormAdd(false);
  };

  return (
    <>
      <FormAdd openForm={openFormAdd} onCloseFormAdd={onCloseFormAdd} />
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
          🔒 Cofre de Senhas{" "}
          <Button
            onClick={() => {
              setOpenFormAdd(true);
            }}
            variant="contained"
          >
            <Add />
          </Button>
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"20%"}>UUID</TableCell>
              <TableCell width={"10%"}>AMBIENTE</TableCell>
              <TableCell width={"10%"}>CHAVE</TableCell>
              <TableCell width={"30%"}>VALOR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {senhas.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ambiente}</TableCell>
                <TableCell>{row.chave}</TableCell>
                <TableCell>
                  <LabelSenha senha={row} updateList={handleBuscaSenhas} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
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
