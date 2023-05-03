import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export function DropDown({ children, title }: any) {
  const [currentIndex, setCurrentIndex] = useState(false);
  const SIZE_ICON = 30;

  return (
    <Stack sx={{}}>
      <Box
        sx={{
          backgroundColor: "blue",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          cursor: "pointer",
        }}
        onClick={() => setCurrentIndex(!currentIndex)}
      >
        <p className="font-bold sm:text-[18px] text-left w-[80%]">{title}</p>
        {currentIndex ? (
          <IoIosArrowUp size={SIZE_ICON} />
        ) : (
          <IoIosArrowDown size={SIZE_ICON} />
        )}
      </Box>
      {currentIndex && <Box sx={{ backgroundColor: "red" }}> {children}</Box>}
    </Stack>
  );
}
