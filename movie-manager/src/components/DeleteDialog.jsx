import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import React from "react";

const DeleteDialog = ({openDialog, handleClose, movie, removeMovie}) => {

    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Вы точно хотите удалить фильм {movie.title}?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>Нет</Button>
                <Button onClick={() => {
                    removeMovie(movie.id);
                }}>
                    Да
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;