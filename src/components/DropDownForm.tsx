import { Box, Stack, Typography } from "@mui/material";
import { DropDown } from "./DropDown";
import DropDownLabel from "./DropDownLabel";
import DropDownAction from "./DropDownAction";

export default function DropDownForm({
  title,
  type,
  description,
  previsao,
  conclusao,
  status,
  editOnClick,
}: any) {
  return (
    <DropDown title={title}>
      <Stack sx={{ px: 2 }}>
        <DropDownLabel label="Tipo de projeto" props={type} />
        <DropDownLabel label=" Descrição" props={description} />
        <DropDownLabel label="Previsão inicio" props={previsao} />
        <DropDownLabel label="Previsão conclusão" props={conclusao} />
        <DropDownLabel label="Status" props={status} />
        <DropDownAction editOnClick={editOnClick} />
      </Stack>
    </DropDown>
  );
}
