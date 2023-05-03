import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { Menu } from "../components/Menu";
import React from "react";
import { DropDown } from "../components/DropDown";
import { CONNREFUSED } from "dns";
import DropDownForm from "../components/DropDownForm";
import { Route, useNavigate } from "react-router-dom";

const form = [
  {
    title: "COND. VILA FERRERA",
    type: "residencial",
    description: "Residencial",
    previsao: "10/10/2021",
    conclusao: "10/10/2021",
    status: "Aberto",
  },
  {
    title: "COND. VILA FERRERA",
    type: "residencial",
    description: "Residencial",
    previsao: "10/10/2021",
    conclusao: "10/10/2021",
    status: "Aberto",
  },
  {
    title: "COND. VILA FERRERA",
    type: "residencial",
    description: "Residencial",
    previsao: "10/10/2021",
    conclusao: "10/10/2021",
    status: "Aberto",
  },
];

export function CreateForm() {
  const navigate = useNavigate();

  const [age, setAge] = React.useState("10");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  function handleEdit() {
    navigate("/editForm");
  }

  return (
    <Menu>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          py: 10,
          px: 2,
        }}
      >
        <Typography>Project</Typography>
        <Typography>Gerenciar Projetos</Typography>
        <Box
          sx={{
            width: "100%",
            p: 2,
          }}
        >
          <Typography>Lista de Projetos</Typography>
          <Button variant="contained" component="label" sx={{ width: "100%" }}>
            Novo Projeto
          </Button>
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

          <DropDown title={"Nome"}>
            {form.map((item) => (
              <DropDownForm
                title={item.title}
                type={item.type}
                decription={item.description}
                previsao={item.previsao}
                conclusao={item.conclusao}
                status={item.status}
                editOnClick={handleEdit}
              />
            ))}
          </DropDown>
        </Box>
      </Stack>
    </Menu>
  );
}
