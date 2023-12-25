import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching.js";
import MovieService from "../API/MovieService.js";
import MovieHeader from "../components/MovieHeader.jsx";
import MovieInfo from "../components/MovieInfo.jsx";
import Loader from "../components/Loader.jsx";
import {Box} from "@mui/material";
import EditAndCreateDialog from "../components/EditAndCreateDialog.jsx";
import DeleteDialog from "../components/DeleteDialog.jsx";


const MovieDetails = () => {
    const router = useNavigate();
    const params = useParams();
    const [movie, setMovie] = useState({});
    const [fetchMovieById, isLoading, error] = useFetching(async () => {
        const response = await MovieService.getById(params.id)
        setMovie(response.data);
    })

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [inputs, setInputs] = useState({
        title: "",
        year: 0,
        runtime: 0,
        director: "",
        actors: "",
        plot: "",
        genres: [],
        posterUrl: ""
    })

    useEffect(() => {
        fetchMovieById()
    }, []);

    async function removeMovie(movie) {
        await MovieService.deleteMovie(movie);
        router("/movies")
    }

    async function editMovie() {
        await MovieService.editMovie(movie.id, inputs)
        fetchMovieById()
        setOpenEdit(false);
    }


    const handleClickOpenEdit = () => {
        setOpenEdit(true);
        setInputs({
            ...inputs,
            title: movie.title,
            year: movie.year,
            runtime: movie.runtime,
            director: movie.director,
            actors: movie.actors,
            plot: movie.plot,
            posterUrl: movie.posterUrl
        });
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    }

    const handleClose = () => {
        setOpenEdit(false);
        setOpenDelete(false);
    };

    if (isLoading) {
        return (
            <Box p={3}>
                <Loader/>
            </Box>
        )
    }

    return (
        <>
            <MovieHeader movie={movie} handleClickOpenEdit={handleClickOpenEdit} handleClickOpenDelete={handleClickOpenDelete}/>
            <DeleteDialog openDialog={openDelete} handleClose={handleClose} movie={movie} removeMovie={removeMovie}/>
            <EditAndCreateDialog openDialog={openEdit} editMovie={editMovie} handleClose={handleClose} setInputs={setInputs} movie={movie} inputs={inputs}/>
            <MovieInfo movie={movie}/>
        </>
    )
};

export default MovieDetails;