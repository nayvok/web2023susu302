import {Box, IconButton, Stack, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined.js";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined.js";
import React from "react";

const MovieHeader = ({movie, handleClickOpen}) => {
    return (
        <Stack direction={"row"} paddingTop={3} paddingX={3}>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}} flexGrow={1}>
                <Typography variant={"subtitle1"}
                            sx={{fontWeight: 500}}
                            color="text.secondary"
                >
                    ID: {movie.id}
                </Typography>
                <IconButton onClick={() => {
                    navigator.clipboard.writeText(movie.id)
                }}>
                    <ContentCopyIcon/>
                </IconButton>
            </Box>
            <Stack direction={"row"}>
                <IconButton>
                    <EditOutlinedIcon/>
                </IconButton>
                <IconButton onClick={handleClickOpen}>
                    <DeleteOutlineOutlinedIcon/>
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default MovieHeader;