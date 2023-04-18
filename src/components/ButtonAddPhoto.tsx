import { Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

interface IButtonAddPhoto {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export function ButtonAddPhoto({ onChange }: IButtonAddPhoto) {
  return (
    <Button
      sx={{ width: "100%", height: 50 }}
      variant="contained"
      component="label"
    >
      <AddAPhotoIcon />
      <input type="file" multiple onChange={onChange} hidden />
    </Button>
  );
}
