import React from 'react';
import {
    AppBar,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditAndCreateDialog = ({openDialog, handleClose, setInputs, editMovie, movie, inputs}) => {

    return (

        <Dialog open={openDialog} onClose={handleClose} fullScreen>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="Закрыть"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Редактирование
                    </Typography>
                    <Button autoFocus color="inherit" onClick={editMovie}>
                        Сохранить
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <Stack>
                    <TextField
                        margin="normal"
                        id="title"
                        label="Название"
                        type="Text"
                        fullWidth
                        defaultValue={movie.title}
                        onChange={e => setInputs({...inputs, title: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        id="year"
                        label="Год выпуска"
                        type="Number"
                        fullWidth
                        defaultValue={movie.year}
                        onChange={e => setInputs({...inputs, year: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        id="runtime"
                        label="Время в минутах"
                        type="Number"
                        fullWidth
                        defaultValue={movie.runtime}
                        onChange={e => setInputs({...inputs, runtime: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        id="director"
                        label="Режиссер"
                        type="Text"
                        fullWidth
                        defaultValue={movie.director}
                        onChange={e => setInputs({...inputs, director: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        id="actors"
                        label="Укажите список актеров (через запятую)"
                        type="Text"
                        fullWidth
                        defaultValue={movie.actors}
                        onChange={e => setInputs({...inputs, actors: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        id="genres"
                        label="Укажите жанры (через запятую)"
                        type="Text"
                        fullWidth
                        defaultValue={movie.genres && movie.genres.join(',')}
                        onChange={e => setInputs({...inputs, genres: e.target.value.split(",")})}
                    />
                    <TextField
                        margin="normal"
                        id="plot"
                        label="Описание"
                        type="Text"
                        fullWidth
                        multiline
                        rows={3}
                        defaultValue={movie.plot}
                        onChange={e => setInputs({...inputs, plot: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        id="posterUrl"
                        label="Укажите ссылку на обложку"
                        type="Text"
                        fullWidth
                        defaultValue={movie.posterUrl}
                        onChange={e => setInputs({...inputs, posterUrl: e.target.value})}
                    />
                </Stack>
            </DialogContent>
        </Dialog>

    );
};

export default EditAndCreateDialog;