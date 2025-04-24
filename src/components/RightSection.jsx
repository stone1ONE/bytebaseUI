// import React from'react';
// import { Typography } from '@mui/material';
// 
// import { Box, textAlign, width } from '@mui/system';
// import img from "../static/imgs/icon.svg"; 

import FormComponent from "./FormComponent";
import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import img from "../static/imgs/icon.svg"; 
const RightSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "180px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "29vh"
      }}
    >
      <img
        src={img}
        alt="bytebase"
        style={{
          width: "300px",
          height: "auto",
          padding: "30px",
        }}
      />
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#3f51b5",  padding: "30px",border:"1px bold black"}}
      >
        Standard
      </Typography>
        <FormComponent/>
      
    </Box>
  );
};

export default RightSection;    