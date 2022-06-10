import React from "react";
import {
  Box,
  Button,
  TextField,
  Avatar,
} from "@mui/material";

export const Sidebar = () => {
  return (
    <>
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: 'center',
				justifyContent: 'space-evenly',
				width: "300px",
				height: "1080px",
				backgroundColor: (theme) => theme.palette.common.third,
			}}
		>
			<Avatar
				sx={{
				backgroundColor: "common.second",
				width: 150,
				height: 150,
				}}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: 'center',
					justifyContent: "space-evenly",
					height: "200px"
				}}	
			>
				<Button
					variant="contained"
					sx={{ backgroundColor: "common.fourth", width: "200px" }}
					>
					Pomodoro
				</Button>
				<Button
					variant="contained"
					sx={{ backgroundColor: "common.fourth", width: "200px" }}
				>
				Statistics
				</Button>
				<Button
					variant="contained"
					sx={{ backgroundColor: "common.fourth", width: "200px" }}
				>
				Explore
				</Button>
			</Box>
			<TextField
				sx={{ width: "70%", backgroundColor: "common.second" }}
				multiline
				rows={10}
				label="Weekly Goals"
				defaultValue=""
				variant="filled"
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: 'center',
					justifyContent: 'space-evenly',
					width: "80%",
					height: "80px",
					borderRadius: "16px",
					backgroundColor: (theme) => theme.palette.common.second,
				}}	
			>
				<Button
					variant="contained"
					sx={{ backgroundColor: "common.fourth" }}
				>
					Login
				</Button>
				<Button
					variant="contained"
					sx={{ backgroundColor: "common.fourth" }}
				>
					Settings
				</Button>
			</Box>
      </Box>
    </>
  );
};
