import { useEffect, useState } from "react";
import api from "../services/api";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

type ISenha = {
  id: string;
  chave: string;
  valor: string;
  ambiente: string;
};

export default function Home() {
  const [senhas, setSenhas] = useState<ISenha[]>([]);

  useEffect(() => {
    handleBuscaSenhas();
  }, []);

  const handleBuscaSenhas = async () => {
    const resp = await api.get("/api/cofre");
    const senhas: ISenha[] = await resp.data;
    setSenhas(senhas);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "UUID", width: 300 },
    { field: "chave", headerName: "CHAVE", width: 100 },
    { field: "valor", headerName: "VALOR", width: 100 },
  ];

  const rows = senhas.map((segredo) => {
    return { id: segredo.id, chave: segredo.chave, valor: segredo.valor };
  });

  return (
    <>
      <Box sx={{ height: "600px", width: "auto", margin: "1rem" }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Listagem de Segredos
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}
