import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching.js";
import MovieService from "../API/MovieService.js";
import DeleteDialog from "../components/DeleteDialog.jsx";
import MovieHeader from "../components/MovieHeader.jsx";
import MovieInfo from "../components/MovieInfo.jsx";

const MovieDetails = () => {
    const router = useNavigate();
    const params = useParams();
    const [movie, setMovie] = useState({});
    const [fetchMovieById, isLoading, error] = useFetching(async () => {
        const response = await MovieService.getById(params.id)
        setMovie(response.data);
        console.log(movie.genres);
    })

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        fetchMovieById()
    }, []);

    async function removeMovie(movie) {
        await MovieService.deleteMovie(movie);
        router("/movies")
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <DeleteDialog openDialog={openDialog} handleClose={handleClose} movie={movie} removeMovie={removeMovie}/>
            <MovieHeader movie={movie} handleClickOpen={handleClickOpen}/>
            <MovieInfo movie={movie}/>
        </>
    )
};

export default MovieDetails;

// {movie.id}
// {movie.title} +
// {movie.year} +
// {movie.runtime}+
// {movie.genres && movie.genres.join(', ')}
// {movie.director} +
// {movie.actors}
// {movie.plot}
// {movie.posterUrl}