import {Box, Pagination} from "@mui/material";
import React from "react";

const PagePagination = ({totalPages, page, changePage}) => {
    return (
        <Box sx={{display: "flex", width: 1, justifyContent: "center", paddingTop: 3}}>
            <Pagination
                count={totalPages}
                page={page}
                onChange={changePage}
                shape="rounded"
                variant="outlined"
                size="large"
            />
        </Box>
    );
};

export default PagePagination;