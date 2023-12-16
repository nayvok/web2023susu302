import React from 'react';
import {Grid, Typography} from "@mui/material";
import MovieItem from "./MovieItem.jsx";
import Loader from "./Loader.jsx";

const MovieList = ({movies, remove, isMoviesLoading}) => {
    if (isMoviesLoading) {
        return (
            <Loader/>
        )
    }

    if (!movies.length) {
        return (
            <Typography
                variant={"h5"}
                sx={{textAlign: "center"}}
            >
                Фильмы не найдены!
            </Typography>
        )
    }

    return (
        <Grid container rowSpacing={3} sx={{width: "100%"}}>
            {movies.map(movie =>
                <MovieItem remove={remove} movie={movie} key={movie.id}/>
            )}
        </Grid>
    )
}

export default MovieList;