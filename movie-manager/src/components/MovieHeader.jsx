import {Box, IconButton, Stack, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React from "react";

const MovieHeader = ({movie, handleClickOpenEdit, handleClickOpenDelete}) => {
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
                <IconButton onClick={handleClickOpenEdit}>
                    <EditOutlinedIcon/>
                </IconButton>
                <IconButton onClick={handleClickOpenDelete}>
                    <DeleteOutlineOutlinedIcon/>
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default MovieHeader;