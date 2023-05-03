import { Box, Button } from "@mui/material";

import { BsPrinter } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function DropDownAction({ editOnClick }: any) {
  return (
    <Box>
      <Button>
        <BsPrinter />
      </Button>
      <Button onClick={editOnClick}>
        <AiOutlineEdit />
      </Button>
      <Button>
        <AiOutlineDelete />
      </Button>
    </Box>
  );
}
