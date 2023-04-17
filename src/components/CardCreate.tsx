import { Box, Typography } from "@mui/material";

interface ICardCreate {
  observation: string;
  check: string | Blob;
  text: string;
  regulation: string;
  description_subitem: string;
  // isSaved: boolean;
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
    <Box sx={{ width: "90%", marginY: 2 }}>
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
      <Box sx={{ flexDirection: "column" }}>
        <input type="file" multiple onChange={imageChange} />

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
      </Box>
      <button
        style={{
          marginTop: 10,
          width: "100%",
          height: 70,
          color: "white",
          borderRadius: 50,
          // backgroundColor: isSaved ? "green" : "blue",
          backgroundColor:
            isSaved === undefined
              ? "blue"
              : isSaved === "offline"
              ? "yellow"
              : isSaved === "online"
              ? "green"
              : "blue",
        }}
        onClick={onClick}
      >
        Salvar
      </button>
    </Box>
  );
}
