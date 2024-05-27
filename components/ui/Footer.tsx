import { Box } from "@mui/material"
import React from "react"

const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        height: "53px",
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFF",
      }}
    >
      {children}
    </Box>
  )
}

export default Footer
