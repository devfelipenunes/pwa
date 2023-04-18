import { Button } from "@mui/material";

interface IButtonSaveForm {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isSaved: string | undefined;
}

export function ButtonSaveForm({ onClick, isSaved }: IButtonSaveForm) {
  return (
    <Button
      style={{
        width: "100%",
        height: 70,
        color: "white",
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
      {isSaved === undefined
        ? "Salvar"
        : isSaved === "offline"
        ? "Salvando"
        : isSaved === "online"
        ? "Salvo"
        : "Salvar"}
    </Button>
  );
}
