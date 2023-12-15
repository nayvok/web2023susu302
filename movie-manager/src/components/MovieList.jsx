import React from 'react';
import {Grid, Typography} from "@mui/material";
import MovieItem from "./MovieItem.jsx";

const MovieList = ({movies}) => {
    if (!movies.length) {
        return(
            <Typography
                variant={"h3"}
                sx={{paddingTop: 5, textAlign: "center"}}
            >
                Фильмы не найдены!
            </Typography>
        )
    }
    return (
        <Grid container spacing={5} sx={{paddingTop: 5}}>
            {movies.map(movie =>
                <MovieItem movie={movie} key={movie.id}/>
            )}
        </Grid>
    );
};

export default MovieList;