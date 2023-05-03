import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Menu } from "../components/Menu";
import React from "react";
import { DropDown } from "../components/DropDown";
import { CONNREFUSED } from "dns";
import DropDownForm from "../components/DropDownForm";
import { Route, useNavigate } from "react-router-dom";

export function EditForm() {
  const navigate = useNavigate();

  const [age, setAge] = React.useState("10");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Menu>
      <Stack
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          py: 10,
          px: 2,
        }}
      >
        <Typography>Project</Typography>
        <Typography>Editar Projetos</Typography>
        <Stack
          spacing={2}
          sx={{
            width: "100%",
            p: 2,
          }}
        >
          <Typography>Lista de Projetos</Typography>

          <TextField
            id="outlined-basic"
            label="Nome do Projeto"
            variant="outlined"
          />

          <TextField
            id="outlined-basic"
            label="Descrição do projeto"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Numero de blocos"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Numero de apartamentos"
            variant="outlined"
          />

          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label={`${age}`}
              onChange={handleChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Box>
          <Button variant="contained" component="label">
            Voltar
          </Button>
          <Button variant="contained" component="label">
            Check List
          </Button>
          <Button variant="contained" component="label">
            Salvar
          </Button>
        </Box>
      </Stack>
    </Menu>
  );
}
