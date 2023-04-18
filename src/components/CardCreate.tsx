import { Box, Button, Stack, Typography } from "@mui/material";
import { ButtonAddPhoto } from "./ButtonAddPhoto";
import { ButtonSaveForm } from "./ButtonSaveForm";

interface ICardCreate {
  observation: string;
  check: boolean;
  text: string;
  regulation: string;
  description_subitem: string;
  isSaved: string | undefined;
  observationChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  imageChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  checkChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function CardCreate({
  observation,
  observationChange,
  check,
  checkChange,
  text,
  regulation,
  imageChange,
  onClick,
  description_subitem,
  isSaved,
}: ICardCreate) {
  return (
    <Box sx={{ flex: 1, width: "90%", marginY: 2 }}>
      <input type="checkbox" checked={check} onChange={checkChange} />
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {regulation}
      </Typography>
      <Typography
        sx={{
          fontWeight: "bold",
        }}
      >
        {description_subitem}
      </Typography>

      <Typography>{text}</Typography>
      <Stack spacing={1} sx={{ flexDirection: "column" }}>
        <ButtonAddPhoto onChange={imageChange} />

        <Typography>Observações</Typography>
        <input
          style={{
            width: "95%",
            height: 50,
          }}
          type="text"
          placeholder="Observação"
          value={observation}
          onChange={observationChange}
        />

        <ButtonSaveForm isSaved={isSaved} onClick={onClick} />
      </Stack>
    </Box>
  );
}
