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
  Typography,
} from "@mui/material";
import api from "../services/api";
import { AxiosError } from "axios";
import { Delete, Edit, LockOpen, Title } from "@mui/icons-material";

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

  type ILabelSenha = {
    senha: string;
  };

  const LabelSenha = ({ senha }: ILabelSenha) => {
    const [exibir, setExibir] = useState(false);

    return (
      <>
        <Input
          type={exibir ? "text" : "password"}
          value={senha !== "null" ? senha : "Não permitido"}
        />
        <Button
          disabled={senha === "null" ? true : false}
          sx={{ ml: "0.25rem" }}
          onClick={() => {
            setExibir(!exibir);
          }}
        >
          <LockOpen />
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
        <Typography textAlign={"left"} variant="h3" sx={{ m: "1rem" }}>
          Listagem de Segredos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"30%"}>UUID</TableCell>
              <TableCell width={"20%"}>CHAVE</TableCell>
              <TableCell width={"30%"}>VALOR</TableCell>
              <TableCell width={"20%"}>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {senhas.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.chave}</TableCell>
                <TableCell>
                  <LabelSenha senha={row.valor} />
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ ml: "0.25rem" }}
                    onClick={() => {
                      console.log(`Editando senha: ${row.id}`);
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    sx={{ ml: "0.25rem" }}
                    onClick={() => {
                      console.log(`Deletando senha: ${row.id}`);
                    }}
                  >
                    <Delete />
                  </Button>
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
