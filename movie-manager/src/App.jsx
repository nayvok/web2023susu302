import {Box, Button, CircularProgress, Container, Stack} from "@mui/material";
import Header from "./components/Header.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieFilter from "./components/MovieFilter.jsx";
import React, {useEffect, useState} from "react";
import {useMovies} from "./hooks/useMovies.jsx";
import axios from "axios";
import MovieService from "./API/MovieService.js";
import Loader from "./components/Loader.jsx";


const App = () => {
    const [movies, setMovies] = useState([]);

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedMovies = useMovies(movies, filter.sort, filter.query);

    const [isMoviesLoading, setIsMoviesLoading] = useState(false);


    useEffect(() => {
        fetchMovies()
    }, []);

    async function fetchMovies() {
        setIsMoviesLoading(true);
        const movies = await MovieService.getAll();
        setMovies(movies);
        setIsMoviesLoading(false);
    }

    async function removeMovie(movie) {
        setMovies(movies.filter(m => m.id !== movie.id));
        await MovieService.deleteMovie(movie.id);
    }

    return (
        <>
            <Header/>
            <Container maxWidth={"lg"}>
                <Stack p={3} spacing={1} sx={{paddingX: {xs: 0, md: 3}}}>
                    <MovieFilter filter={filter} setFilter={setFilter}/>
                    <MovieList isMoviesLoading={isMoviesLoading} remove={removeMovie} movies={sortedAndSearchedMovies}/>
                </Stack>
            </Container>

        </>

    )
}

export default App;
