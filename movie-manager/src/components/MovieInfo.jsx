import {Box, Grid, Stack, Typography} from "@mui/material";
import React from "react";


const MovieInfo = ({movie}) => {
    return (
        <Stack p={3} direction={"column"} spacing={5}>
            <Stack direction={{sm: "column", md: "row"}} spacing={5}>
                <Box component={"img"} src={movie.posterUrl} alt={"logo"} sx={{
                    height: "397px",
                    width: 250,
                    objectFit: "cover",
                    objectPosition: "50% 50%",
                    borderRadius: "6px"
                }}></Box>
                <Stack direction={"column"} spacing={5}>
                    <Box>
                        <Typography variant={"h2"} sx={{fontWeight: 500}}>
                            {movie.title}
                        </Typography>
                        <Typography variant={"h6"} sx={{paddingLeft: 1 / 2, paddingTop: 1}} color="text.secondary">
                            {movie.director}
                        </Typography>
                    </Box>
                    <Box>
                        <Stack direction={"column"} spacing={5}>
                            <Box>
                                <Typography variant={"h5"} sx={{paddingLeft: 1 / 2, fontWeight: 500}}>
                                    О фильме
                                </Typography>
                                <Grid container>
                                    <Grid item xs={6} sm={4} md={5}>
                                        <Typography variant={"subtitle1"}
                                                    sx={{paddingLeft: 1 / 2, paddingTop: 1, fontWeight: 500}}
                                                    color="text.secondary">
                                            Год произовдства
                                        </Typography>
                                        <Typography variant={"subtitle1"}
                                                    sx={{paddingLeft: 1 / 2, paddingTop: 1, fontWeight: 500}}
                                                    color="text.secondary">
                                            Время
                                        </Typography>
                                        <Typography variant={"subtitle1"}
                                                    sx={{paddingLeft: 1 / 2, paddingTop: 1, fontWeight: 500}}
                                                    color="text.secondary">
                                            Жанр
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={6}>
                                        <Typography variant={"subtitle1"}
                                                    sx={{paddingLeft: 1 / 2, paddingTop: 1, fontWeight: 500}}>
                                            {movie.year}
                                        </Typography>
                                        <Typography variant={"subtitle1"}
                                                    sx={{paddingLeft: 1 / 2, paddingTop: 1, fontWeight: 500}}>
                                            {movie.runtime} мин.
                                        </Typography>
                                        <Typography variant={"subtitle1"}
                                                    sx={{paddingLeft: 1 / 2, paddingTop: 1, fontWeight: 500}}>
                                            {movie.genres && movie.genres.join(', ')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Typography variant={"h5"} sx={{paddingLeft: 1 / 2, fontWeight: 500}}>
                                    В главных ролях
                                </Typography>
                                <Typography variant={"subtitle1"}
                                            sx={{paddingLeft: 1 / 2, paddingTop: 1, fontWeight: 500}}>
                                    {movie.actors}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>

            <Stack direction={"column"} spacing={1}>
                <Typography variant={"h4"} sx={{fontWeight: 500}}>
                    Описание
                </Typography>
                <Typography variant={"body1"}
                            sx={{paddingLeft: 1 / 2, paddingTop: 1, fontWeight: 500}}>
                    {movie.plot}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default MovieInfo;