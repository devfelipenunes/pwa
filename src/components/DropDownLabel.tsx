import { Box, Typography } from "@mui/material";

export default function DropDownLabel({ props, label }: any) {
  return (
    <Box sx={{ display: "flex", py: 1 }}>
      <Typography fontWeight={"bold"} sx={{ mr: 2 }}>
        {label}
      </Typography>
      <Typography>{props}</Typography>
    </Box>
  );
}
